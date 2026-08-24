import { mergeAttributes, Node } from '@tiptap/core';
import { figureClassName, imageStyleFromClassList, normalizeWidth, widthFromElement, widthStyle, type ImageStyleName } from './shared';
import { createImageResizeView } from './resizeView';

export interface CkImageOptions {
  /** Drag handles on block images, i.e. CKEditor's ImageResize. */
  resizable: boolean;
  resizeUnit: 'px' | '%';
}

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    ckImage: {
      setImage: (attributes: { src: string; alt?: string; width?: string | null }) => ReturnType;
      setImageStyle: (style: ImageStyleName | null) => ReturnType;
      setImageWidth: (width: string | number | null) => ReturnType;
    };
  }
}

const sharedAttributes = {
  src: { default: null as string | null },
  alt: {
    default: null as string | null,
    renderHTML: (attributes: Record<string, any>) => (attributes.alt ? { alt: attributes.alt } : {})
  },
  width: { default: null as string | null, rendered: false },
  uploadId: { default: null as string | null, rendered: false },
  uploading: { default: false, rendered: false }
};

/** `<figure class="image"><img src=".."></figure>`, the shape CKEditor's ImageBlock writes. */
export const CkImageBlock = Node.create<CkImageOptions>({
  name: 'ckImageBlock',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addOptions() {
    return { resizable: true, resizeUnit: 'px' };
  },

  addAttributes() {
    return {
      ...sharedAttributes,
      imageStyle: { default: null as ImageStyleName | null, rendered: false }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure.image',
        priority: 60,
        getAttrs: (element) => {
          const figure = element as HTMLElement;
          const img = figure.querySelector('img');
          if (!img) return false;

          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            width: widthFromElement(figure, img),
            imageStyle: imageStyleFromClassList(figure.classList)
          };
        }
      },
      {
        // A bare `<img>` that is the only child of a block: CKEditor 4 notes and
        // pasted mail content store block images this way.
        tag: 'img[src]',
        priority: 40,
        getAttrs: (element) => {
          const img = element as HTMLElement;
          const parent = img.parentElement;
          const isOnlyChild = Boolean(parent && parent.childNodes.length === 1 && ['P', 'DIV', 'FIGURE'].includes(parent.tagName));
          if (!isOnlyChild) return false;

          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            width: widthFromElement(null, img),
            imageStyle: imageStyleFromClassList(img.classList)
          };
        }
      }
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const width = normalizeWidth(node.attrs.width);
    const style = widthStyle(width);

    return [
      'figure',
      { class: figureClassName(width, node.attrs.imageStyle), ...(style ? { style } : {}) },
      ['img', mergeAttributes(HTMLAttributes, { src: node.attrs.src, ...(style ? { style } : {}) })]
    ];
  },

  addNodeView() {
    return createImageResizeView({ resizable: () => this.options.resizable });
  },

  addCommands() {
    return {
      setImage:
        (attributes) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { ...attributes, width: normalizeWidth(attributes.width ?? null) } }),

      setImageStyle:
        (style) =>
        ({ tr, state, dispatch }) => {
          const { from, to } = state.selection;
          let changed = false;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name !== this.name) return;

            tr.setNodeMarkup(pos, undefined, { ...node.attrs, imageStyle: node.attrs.imageStyle === style ? null : style });
            changed = true;
          });

          if (changed && dispatch) dispatch(tr);

          return changed;
        },

      setImageWidth:
        (width) =>
        ({ tr, state, dispatch }) => {
          const { from, to } = state.selection;
          const normalized = normalizeWidth(width);
          let changed = false;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name !== this.name && node.type.name !== 'ckImageInline') return;

            tr.setNodeMarkup(pos, undefined, { ...node.attrs, width: normalized });
            changed = true;
          });

          if (changed && dispatch) dispatch(tr);

          return changed;
        }
    };
  }
});

/** `<p>text <img src=".."></p>`, CKEditor's ImageInline. */
export const CkImageInline = Node.create({
  name: 'ckImageInline',
  group: 'inline',
  inline: true,
  atom: true,
  draggable: true,

  addAttributes() {
    return { ...sharedAttributes };
  },

  parseHTML() {
    return [{ tag: 'img[src]', priority: 30, getAttrs: (element) => ({
      src: (element as HTMLElement).getAttribute('src'),
      alt: (element as HTMLElement).getAttribute('alt'),
      width: widthFromElement(null, element as HTMLElement)
    }) }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const width = normalizeWidth(node.attrs.width);
    const style = widthStyle(width);

    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        src: node.attrs.src,
        ...(width ? { class: 'image_resized' } : {}),
        ...(style ? { style } : {})
      })
    ];
  }
});
