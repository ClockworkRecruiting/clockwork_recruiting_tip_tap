import { Editor } from '@tiptap/core';
import buildExtensions from '../src/config/extensions';
import serializeToCkHtml from '../src/html/serialize';
import normalizeIncomingHtml from '../src/html/normalize';
import { fontSizeClassForPx } from '../src/extensions/fontSize';
import type { EditorConfig } from '../src/types';

/** The config object the app passes today, trimmed to what affects HTML. */
export const APP_CONFIG: EditorConfig = {
  image: {
    styles: ['alignLeft', 'alignRight'],
    upload: { types: ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'bmp', 'webp'] },
    resizeUnit: 'px',
    resizeOptions: [
      { name: 'resizeImage:original', label: 'Original', value: null },
      { name: 'resizeImage:150', label: '150px', value: '150' },
      { name: 'resizeImage:250', label: '250px', value: '250' }
    ]
  },
  link: { defaultProtocol: 'https://', addTargetToExternalLinks: true },
  typing: { transformations: { remove: ['oneHalf', 'oneThird', 'twoThirds', 'oneForth', 'threeQuarters'] } }
};

export const createEditor = (content = '', config: EditorConfig = APP_CONFIG): Editor =>
  new Editor({
    extensions: buildExtensions({ config }),
    content: normalizeIncomingHtml(content, { fontSizeClassForPx })
  });

/** Sorts attributes so comparisons ignore attribute order, which never affects rendering. */
export const canonical = (html: string): string => {
  const container = document.createElement('div');
  container.innerHTML = html;

  container.querySelectorAll('*').forEach((element) => {
    const attributes = Array.from(element.attributes)
      .map((attribute) => ({ name: attribute.name, value: attribute.value }))
      .sort((left, right) => left.name.localeCompare(right.name));

    attributes.forEach((attribute) => element.removeAttribute(attribute.name));
    attributes.forEach((attribute) => element.setAttribute(attribute.name, attribute.value.replace(/\s+/g, ' ').trim()));
  });

  return container.innerHTML.replace(/>\s+</g, '><').trim();
};

export const roundTrip = (html: string, config: EditorConfig = APP_CONFIG): string => {
  const editor = createEditor(html, config);
  const output = serializeToCkHtml(editor.getHTML());
  editor.destroy();

  return output;
};

/**
 * Types text the way a user does, so input rules (autoformat, typography) run.
 * `insertContent` bypasses them.
 */
export const typeText = (editor: Editor, text: string): void => {
  Array.from(text).forEach((char) => {
    const { from, to } = editor.state.selection;
    const handled = editor.view.someProp('handleTextInput', (handler) =>
      handler(editor.view, from, to, char, () => editor.state.tr.insertText(char, from, to))
    );

    if (!handled) editor.view.dispatch(editor.state.tr.insertText(char, from, to));
  });
};
