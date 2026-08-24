import { Mark, mergeAttributes } from '@tiptap/core';

/**
 * CKEditor's Highlight feature: `<mark class="marker-yellow">`. The class list is
 * the CKEditor default set, which is also the set `_variables.scss` styles.
 */
export const HIGHLIGHT_OPTIONS = [
  { model: 'yellowMarker', className: 'marker-yellow', title: 'Yellow marker', color: 'var(--cw-highlight-yellow, #fdfd77)', type: 'marker' },
  { model: 'greenMarker', className: 'marker-green', title: 'Green marker', color: 'var(--cw-highlight-green, #62f962)', type: 'marker' },
  { model: 'pinkMarker', className: 'marker-pink', title: 'Pink marker', color: 'var(--cw-highlight-pink, #fc7899)', type: 'marker' },
  { model: 'blueMarker', className: 'marker-blue', title: 'Blue marker', color: 'var(--cw-highlight-blue, #72cdfd)', type: 'marker' },
  { model: 'redPen', className: 'pen-red', title: 'Red pen', color: 'var(--cw-highlight-pen-red, #e91313)', type: 'pen' },
  { model: 'greenPen', className: 'pen-green', title: 'Green pen', color: 'var(--cw-highlight-pen-green, #118800)', type: 'pen' }
] as const;

const CLASS_NAMES = HIGHLIGHT_OPTIONS.map((option) => option.className);
const DEFAULT_CLASS_NAME = 'marker-yellow';

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    highlight: {
      setHighlight: (className: string) => ReturnType;
      toggleHighlight: (className: string) => ReturnType;
      unsetHighlight: () => ReturnType;
    };
  }
}

export const Highlight = Mark.create({
  name: 'highlight',

  addAttributes() {
    return {
      class: {
        default: DEFAULT_CLASS_NAME,
        parseHTML: (element) => CLASS_NAMES.find((name) => element.classList.contains(name)) || DEFAULT_CLASS_NAME,
        renderHTML: (attributes) => ({ class: attributes.class || DEFAULT_CLASS_NAME })
      }
    };
  },

  parseHTML() {
    // `<mark>` without a class comes from pasted content; `<span class="marker-*">`
    // from CKEditor 4 era notes.
    return [{ tag: 'mark' }, ...CLASS_NAMES.map((className) => ({ tag: `span.${className}` }))];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setHighlight:
        (className) =>
        ({ commands }) =>
          commands.setMark(this.name, { class: className }),
      toggleHighlight:
        (className) =>
        ({ commands, editor }) => {
          const isActive = editor.isActive(this.name, { class: className });

          return isActive ? commands.unsetMark(this.name) : commands.setMark(this.name, { class: className });
        },
      unsetHighlight:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    };
  }
});

export default Highlight;
