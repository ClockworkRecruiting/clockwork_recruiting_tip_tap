import { Extension } from '@tiptap/core';
export interface SubmitOptions {
    onSubmit: (() => void) | null;
}
/**
 * The Ctrl+Enter handler the note forms bound manually on the CKEditor instance.
 */
export declare const SubmitOnCtrlEnter: Extension<SubmitOptions, any>;
export default SubmitOnCtrlEnter;
