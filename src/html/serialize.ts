/**
 * Output normalisation.
 *
 * Tiptap and CKEditor disagree on two details of the HTML they produce. Notes
 * written with either editor have to keep rendering identically in every
 * read-only view, so the Tiptap output is reshaped into the CKEditor shape
 * before it leaves the component:
 *
 *   1. list items: Tiptap writes `<li><p>text</p></li>`, CKEditor `<li>text</li>`
 *   2. empty paragraphs: Tiptap writes `<p></p>`, CKEditor `<p>&nbsp;</p>`
 */

const NBSP = '\u00A0';

const isSingleParagraph = (child: Element): boolean => child.tagName === 'P' && !child.attributes.length;

/** `<li><p>a</p><ul>..</ul></li>` -> `<li>a<ul>..</ul></li>` */
const unwrapListItemParagraphs = (root: ParentNode): void => {
  root.querySelectorAll('li').forEach((li) => {
    const paragraphs = Array.from(li.children).filter(isSingleParagraph);
    // Only unwrap when a paragraph cannot be confused with intentional block
    // structure: a single leading paragraph, exactly as CKEditor writes lists.
    if (paragraphs.length !== 1 || paragraphs[0] !== li.firstElementChild) return;

    const paragraph = paragraphs[0];
    while (paragraph.firstChild) li.insertBefore(paragraph.firstChild, paragraph);
    li.removeChild(paragraph);
  });
};

const fillEmptyParagraphs = (root: ParentNode): void => {
  root.querySelectorAll('p').forEach((paragraph) => {
    if (paragraph.childNodes.length === 0) paragraph.textContent = NBSP;
  });
};

/** CKEditor wrote italics as `<i>`; ProseMirror's schema renders `<em>`. */
const emToItalicTag = (root: ParentNode, doc: Document): void => {
  root.querySelectorAll('em').forEach((em) => {
    const italic = doc.createElement('i');
    Array.from(em.attributes).forEach((attribute) => italic.setAttribute(attribute.name, attribute.value));
    while (em.firstChild) italic.appendChild(em.firstChild);
    em.replaceWith(italic);
  });
};

/**
 * The DOM serialiser expands `width:150px` to `width: 150px`. CKEditor wrote the
 * compact form, so notes keep the exact same bytes after an edit.
 */
const compactStyleAttributes = (root: ParentNode): void => {
  root.querySelectorAll<HTMLElement>('[style]').forEach((element) => {
    const style = element.getAttribute('style');
    if (!style) return;

    element.setAttribute('style', style.replace(/:\s+/g, ':').replace(/;\s+/g, ';').trim());
  });
};

/** Strips the `<br>` ProseMirror keeps as a trailing placeholder inside empty blocks. */
const removeTrailingBreakPlaceholders = (root: ParentNode): void => {
  root.querySelectorAll('br.ProseMirror-trailingBreak, br[data-placeholder]').forEach((br) => br.remove());
};

export const serializeToCkHtml = (html: string, doc: Document = document): string => {
  if (!html) return '';

  const container = doc.createElement('div');
  container.innerHTML = html;

  removeTrailingBreakPlaceholders(container);
  unwrapListItemParagraphs(container);
  emToItalicTag(container, doc);
  compactStyleAttributes(container);
  fillEmptyParagraphs(container);

  const output = container.innerHTML;

  // CKEditor returns an empty string for an empty document; Tiptap returns a
  // single empty paragraph. Call sites test note bodies for emptiness.
  const isEmptyDocument = output === '<p>&nbsp;</p>' || output === `<p>${NBSP}</p>` || output === '<p></p>';

  return isEmptyDocument ? '' : output;
};

export default serializeToCkHtml;
