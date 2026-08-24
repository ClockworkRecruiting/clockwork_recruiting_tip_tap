import type { NodeViewRenderer } from '@tiptap/core';
/**
 * Vanilla node view for block images: renders the CKEditor figure markup and adds
 * CKEditor's corner drag handles (the ImageResize feature). Written without React
 * so the node view keeps working in read-only renders and outside a React tree.
 */
export declare const createImageResizeView: ({ resizable }: {
    resizable: () => boolean;
}) => NodeViewRenderer;
export default createImageResizeView;
