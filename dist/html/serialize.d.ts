/**
 * Output normalisation.
 *
 * Tiptap and CKEditor disagree on two details of the HTML they produce. Notes
 * written with either editor have to keep rendering identically in every
 * read-only view, so the Tiptap output is reshaped into the CKEditor shape
 * before it leaves the component:
 *
 *   1. list items: Tiptap writes `<li><p>text</p></li>`, CKEditor `<li>text</li>`
 *   2. empty paragraphs: Tiptap writes `<p></p>`, CKEditor `<p>&nbsp;</p>`
 */
export declare const serializeToCkHtml: (html: string, doc?: Document) => string;
export default serializeToCkHtml;
