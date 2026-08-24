/**
 * Input normalisation: everything the editor loads goes through here, whether it
 * came from the database (CKEditor 5 output, and older CKEditor 4 output that
 * was never rewritten) or from the clipboard.
 */
export interface NormalizeOptions {
    fontSizeClassForPx?: (px: number) => string | null;
}
export declare const normalizeIncomingHtml: (html: string, options?: NormalizeOptions, doc?: Document) => string;
export default normalizeIncomingHtml;
