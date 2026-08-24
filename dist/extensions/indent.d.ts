import { Extension } from '@tiptap/core';
/**
 * CKEditor's Indent + IndentBlock pair.
 *
 * On a list item the buttons change nesting (Indent), everywhere else they add
 * `margin-left` in 40px steps (IndentBlock with its default offset), which is
 * exactly what the stored notes contain.
 */
export declare const INDENT_STEP_PX = 40;
export declare const MAX_INDENT_STEPS = 10;
export interface IndentOptions {
    types: string[];
    stepPx: number;
    maxSteps: number;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        indent: {
            indentBlock: () => ReturnType;
            outdentBlock: () => ReturnType;
            unsetBlockIndent: () => ReturnType;
        };
    }
}
export declare const Indent: Extension<IndentOptions, any>;
export default Indent;
