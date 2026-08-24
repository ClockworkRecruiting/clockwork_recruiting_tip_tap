import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * CKEditor's PasteFromOffice: Word and Google Docs put their own presentation
 * markup on the clipboard, which has to be reduced to the small set of tags the
 * notes schema allows before ProseMirror parses it.
 */

const isOfficeHtml = (html: string): boolean =>
  /urn:schemas-microsoft-com|mso-|class="?Mso|docs-internal-guid/i.test(html);

const NOISE_SELECTORS = ['style', 'meta', 'link', 'xml', 'o\\:p', 'w\\:sdt', 'v\\:shapetype', 'v\\:shape'];

const removeNoise = (root: HTMLElement): void => {
  NOISE_SELECTORS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((node) => node.remove());
  });

  // Word wraps conditional markup in comments.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  const comments: Comment[] = [];
  while (walker.nextNode()) comments.push(walker.currentNode as Comment);
  comments.forEach((comment) => comment.remove());
};

/**
 * Google Docs wraps the whole fragment in `<b id="docs-internal-guid-..."
 * style="font-weight:normal">`. Left in place, stripping its style would turn the
 * entire paste bold.
 */
const unwrapFakeBold = (root: HTMLElement): void => {
  root.querySelectorAll<HTMLElement>('b, strong').forEach((element) => {
    const weight = element.style.fontWeight;
    const isWrapper = weight === 'normal' || weight === '400' || element.id.startsWith('docs-internal-guid');
    if (!isWrapper) return;

    element.replaceWith(...Array.from(element.childNodes));
  });
};

/** Word/Docs express emphasis with inline styles on spans; turn it into real tags. */
const inlineStylesToTags = (root: HTMLElement): void => {
  root.querySelectorAll<HTMLElement>('span[style], p[style], div[style]').forEach((element) => {
    const { fontWeight, fontStyle, textDecoration, textDecorationLine } = element.style;
    const weight = parseInt(fontWeight, 10);
    const decoration = `${textDecoration} ${textDecorationLine}`;

    const wrappers: string[] = [];
    if (fontWeight === 'bold' || fontWeight === 'bolder' || (!Number.isNaN(weight) && weight >= 600)) wrappers.push('strong');
    if (fontStyle === 'italic') wrappers.push('i');
    if (decoration.includes('underline')) wrappers.push('u');
    if (decoration.includes('line-through')) wrappers.push('s');
    if (!wrappers.length) return;

    const inner = wrappers.reduce<HTMLElement | null>((child, tag) => {
      const wrapper = document.createElement(tag);
      if (child) wrapper.appendChild(child);

      return wrapper;
    }, null);

    if (!inner) return;

    // `inner` is the outermost wrapper; walk down to the deepest one.
    let deepest: HTMLElement = inner;
    while (deepest.firstElementChild) deepest = deepest.firstElementChild as HTMLElement;

    while (element.firstChild) deepest.appendChild(element.firstChild);
    element.appendChild(inner);
    element.removeAttribute('style');
  });
};

const LIST_BULLETS = /^\s*([•·§\-*o])\s+/;
const LIST_NUMBERS = /^\s*(\d+|[a-z]|[ivx]+)[.)]\s+/i;

/**
 * Word exports list items as ordinary paragraphs carrying `mso-list`. Group the
 * consecutive ones back into real `ul`/`ol` elements.
 */
const rebuildWordLists = (root: HTMLElement): void => {
  const paragraphs = Array.from(root.querySelectorAll<HTMLElement>('p'));
  let index = 0;

  while (index < paragraphs.length) {
    const paragraph = paragraphs[index];
    const isListParagraph = paragraph.style.getPropertyValue('mso-list') || /MsoList/i.test(paragraph.className);

    if (!isListParagraph) {
      index += 1;
      // eslint-disable-next-line no-continue
      continue;
    }

    const group: HTMLElement[] = [];
    let cursor: HTMLElement | undefined = paragraph;
    while (cursor && (cursor.style.getPropertyValue('mso-list') || /MsoList/i.test(cursor.className))) {
      group.push(cursor);
      const next = cursor.nextElementSibling as HTMLElement | null;
      cursor = next && next.tagName === 'P' ? next : undefined;
    }

    // Word writes the bullet or number into a leading ignored span.
    const firstText = group[0].textContent || '';
    const ordered = !LIST_BULLETS.test(firstText) && LIST_NUMBERS.test(firstText);
    const list = document.createElement(ordered ? 'ol' : 'ul');

    group[0].parentNode?.insertBefore(list, group[0]);

    group.forEach((item) => {
      item.querySelectorAll('[style*="mso-list:Ignore"], [style*="mso-list: Ignore"]').forEach((marker) => marker.remove());

      const listItem = document.createElement('li');
      while (item.firstChild) listItem.appendChild(item.firstChild);
      listItem.innerHTML = listItem.innerHTML.replace(LIST_BULLETS, '').replace(LIST_NUMBERS, '');
      list.appendChild(listItem);
      item.remove();
    });

    index += group.length;
  }
};

/** Keeps the attributes the notes schema understands and drops the rest. */
const stripPresentation = (root: HTMLElement): void => {
  root.querySelectorAll<HTMLElement>('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();

      if (['href', 'src', 'alt', 'colspan', 'rowspan', 'data-mention', 'data-resource-type', 'data-resource-id'].includes(name)) return;

      if (name === 'class') {
        // Keep only the classes this editor round-trips.
        const kept = Array.from(element.classList).filter((className) =>
          /^(mention|image|image_resized|image-style-align-(left|right)|text-(tiny|small|big|huge)|marker-(yellow|green|pink|blue)|pen-(red|green))$/.test(className)
        );

        if (kept.length) element.className = kept.join(' ');
        else element.removeAttribute('class');

        return;
      }

      if (name === 'style') {
        const marginLeft = element.style.marginLeft;
        const width = element.style.width;
        element.removeAttribute('style');

        if (marginLeft && /^\d/.test(marginLeft) && ['P', 'BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
          element.style.marginLeft = marginLeft;
        }
        if (width && ['IMG', 'FIGURE'].includes(element.tagName)) element.style.width = width;

        return;
      }

      element.removeAttribute(attribute.name);
    });
  });

  // Word emits empty paragraphs and spans in bulk.
  root.querySelectorAll('span').forEach((span) => {
    if (!span.attributes.length) span.replaceWith(...Array.from(span.childNodes));
  });
  root.querySelectorAll('font').forEach((font) => font.replaceWith(...Array.from(font.childNodes)));
};

export const transformOfficeHtml = (html: string): string => {
  if (!isOfficeHtml(html)) return html;

  const container = document.createElement('div');
  container.innerHTML = html;

  removeNoise(container);
  unwrapFakeBold(container);
  inlineStylesToTags(container);
  rebuildWordLists(container);
  stripPresentation(container);

  return container.innerHTML;
};

export const PasteFromOffice = Extension.create({
  name: 'pasteFromOffice',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('cwPasteFromOffice'),
        props: {
          transformPastedHTML: (html) => transformOfficeHtml(html)
        }
      })
    ];
  }
});

export default PasteFromOffice;
