import { Extension } from '@tiptap/core';
/**
 * CKEditor's RemoveFormat: clears the formatting marks and the block indent, and
 * deliberately leaves links, mentions and images alone.
 */
export declare const FORMATTING_MARKS: string[];
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        removeFormat: {
            removeFormat: () => ReturnType;
        };
    }
}
export declare const RemoveFormat: Extension<any, any>;
export default RemoveFormat;
