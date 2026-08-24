import type { Extensions } from '@tiptap/core';
import type { EditorConfig, UploadHandler } from '../types';
export interface BuildExtensionsOptions {
    config: EditorConfig;
    upload?: UploadHandler | null;
    onSubmit?: (() => void) | null;
    placeholder?: string;
    onUploadError?: (message: string) => void;
}
/**
 * The extension set matching the CKEditor build one for one.
 *
 * Nodes and marks the CKEditor build did not include (headings, horizontal
 * rules) are parsed but have no input rule and no toolbar button: they exist so
 * that older notes containing them survive a round-trip instead of being
 * silently rewritten, without adding authoring behaviour CKEditor never had.
 */
export declare const buildExtensions: ({ config, upload, onSubmit, placeholder, onUploadError }: BuildExtensionsOptions) => Extensions;
export default buildExtensions;
