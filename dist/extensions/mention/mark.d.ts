import { Mark } from '@tiptap/core';
/**
 * The mention anchor, byte-identical to what the CKEditor mention converter in
 * `CKEditorMentionCustomizationAdapter.js` produced:
 *
 *   <a class="mention" data-mention="@Jane Doe" data-resource-type="Person"
 *      data-resource-id="42" href="https://app/firm/people/42">@Jane Doe</a>
 *
 * Modelled as a mark (CKEditor stored mentions as a text attribute) so existing
 * markup round-trips unchanged.
 */
export declare const MentionMark: Mark<any, any>;
export default MentionMark;
