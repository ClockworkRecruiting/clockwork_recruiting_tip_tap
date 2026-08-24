import type { Editor } from '@tiptap/core';
import type { EditorConfig } from '../types';
export interface ToolbarProps {
    editor: Editor;
    items: string[];
    config: EditorConfig;
}
/**
 * Renders the toolbar from the CKEditor item names the app already passes in
 * `CKEDITOR_CONFIG.toolbar`, so `excludeToolbar` keeps working unchanged. Names
 * are matched case-insensitively because the app's list uses `fontsize` where
 * CKEditor registered `fontSize`.
 */
export declare const Toolbar: ({ editor, items, config }: ToolbarProps) => import("react").JSX.Element;
export default Toolbar;
