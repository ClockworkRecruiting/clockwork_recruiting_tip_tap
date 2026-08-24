import { Mark, mergeAttributes } from '@tiptap/core';

/**
 * CKEditor's FontSize feature with named presets, which is what the notes in the
 * database were written with: a `<span>` carrying one of four classes. The px
 * values below are the ones `_variables.scss` renders those classes at, and are
 * used only to map legacy inline `font-size` styles onto the scale.
 */
export const FONT_SIZE_PRESETS = [
  { name: 'tiny', className: 'text-tiny', px: 9.1, label: 'Tiny' },
  { name: 'small', className: 'text-small', px: 11.05, label: 'Small' },
  { name: 'default', className: null, px: 13, label: 'Default' },
  { name: 'big', className: 'text-big', px: 18.2, label: 'Big' },
  { name: 'huge', className: 'text-huge', px: 23.4, label: 'Huge' }
] as const;

export type FontSizeName = (typeof FONT_SIZE_PRESETS)[number]['name'];

const CLASS_NAMES = FONT_SIZE_PRESETS.map((preset) => preset.className).filter(Boolean) as string[];

/** Nearest preset for a legacy inline size, or `null` for the default size. */
export const fontSizeClassForPx = (px: number): string | null => {
  const nearest = FONT_SIZE_PRESETS.reduce((best, preset) => (Math.abs(preset.px - px) < Math.abs(best.px - px) ? preset : best));

  return nearest.className;
};

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (name: FontSizeName) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => CLASS_NAMES.find((name) => element.classList.contains(name)) || null,
        renderHTML: (attributes) => (attributes.class ? { class: attributes.class } : {})
      }
    };
  },

  parseHTML() {
    return CLASS_NAMES.map((className) => ({ tag: `span.${className}` }));
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (name) =>
        ({ commands }) => {
          const preset = FONT_SIZE_PRESETS.find((item) => item.name === name);
          if (!preset || !preset.className) return commands.unsetMark(this.name);

          return commands.setMark(this.name, { class: preset.className });
        },
      unsetFontSize:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    };
  }
});

export default FontSize;
