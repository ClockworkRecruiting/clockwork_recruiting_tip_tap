import type { NodeViewRenderer } from '@tiptap/core';
import { figureClassName, normalizeWidth } from './shared';

const HANDLE_POSITIONS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const;

const MIN_WIDTH_PX = 40;

/**
 * Vanilla node view for block images: renders the CKEditor figure markup and adds
 * CKEditor's corner drag handles (the ImageResize feature). Written without React
 * so the node view keeps working in read-only renders and outside a React tree.
 */
export const createImageResizeView =
  ({ resizable }: { resizable: () => boolean }): NodeViewRenderer =>
  ({ node, editor, getPos }) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    let currentWidth: string | null = normalizeWidth(node.attrs.width);

    const applyAttributes = (attrs: Record<string, any>) => {
      currentWidth = normalizeWidth(attrs.width);
      figure.className = figureClassName(currentWidth, attrs.imageStyle, [
        'cw-image',
        attrs.uploading ? 'cw-image--uploading' : ''
      ].filter(Boolean));
      figure.style.width = currentWidth || '';
      if (attrs.uploadId) figure.dataset.uploadId = attrs.uploadId;
      else delete figure.dataset.uploadId;
      img.src = attrs.src || '';
      img.style.width = currentWidth || '';
      if (attrs.alt) img.alt = attrs.alt;
      else img.removeAttribute('alt');
    };

    applyAttributes(node.attrs);
    figure.appendChild(img);

    const progress = document.createElement('div');
    progress.className = 'cw-image__progress';
    figure.appendChild(progress);

    const setProgress = (value: number) => {
      progress.style.width = `${Math.round(value * 100)}%`;
    };

    setProgress(0);

    const startDrag = (event: PointerEvent) => {
      if (!editor.isEditable || !resizable()) return;
      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const startWidth = img.getBoundingClientRect().width;
      const handle = event.currentTarget as HTMLElement;
      const flip = handle.dataset.position?.includes('left') ? -1 : 1;

      figure.classList.add('cw-image--resizing');

      const onMove = (moveEvent: PointerEvent) => {
        const next = Math.max(MIN_WIDTH_PX, Math.round(startWidth + (moveEvent.clientX - startX) * flip));
        figure.style.width = `${next}px`;
        img.style.width = `${next}px`;
      };

      const onUp = () => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        figure.classList.remove('cw-image--resizing');

        const width = `${Math.round(img.getBoundingClientRect().width)}px`;
        const position = typeof getPos === 'function' ? getPos() : null;
        if (position === null || position === undefined) return;

        editor.view.dispatch(
          editor.view.state.tr.setNodeMarkup(position, undefined, {
            ...editor.view.state.doc.nodeAt(position)?.attrs,
            width
          })
        );
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    };

    HANDLE_POSITIONS.forEach((position) => {
      const handle = document.createElement('span');
      handle.className = `cw-image__handle cw-image__handle--${position}`;
      handle.dataset.position = position;
      handle.addEventListener('pointerdown', startDrag);
      figure.appendChild(handle);
    });

    return {
      dom: figure,

      update(updatedNode) {
        if (updatedNode.type.name !== node.type.name) return false;

        applyAttributes(updatedNode.attrs);
        return true;
      },

      selectNode() {
        figure.classList.add('cw-image--selected');
      },

      deselectNode() {
        figure.classList.remove('cw-image--selected');
      },

      ignoreMutation: () => true,

      setUploadProgress: setProgress
    } as any;
  };

export default createImageResizeView;
