import { Mark, mergeAttributes } from '@tiptap/core';

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
export const MentionMark = Mark.create({
  name: 'mention',
  inclusive: false,
  spanning: false,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-mention'),
        renderHTML: (attributes) => (attributes.id ? { 'data-mention': attributes.id } : {})
      },
      resourceType: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-resource-type'),
        renderHTML: (attributes) => (attributes.resourceType ? { 'data-resource-type': attributes.resourceType } : {})
      },
      resourceId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-resource-id'),
        renderHTML: (attributes) => (attributes.resourceId === null || attributes.resourceId === undefined ? {} : { 'data-resource-id': attributes.resourceId })
      },
      href: {
        default: null,
        parseHTML: (element) => element.getAttribute('href'),
        renderHTML: (attributes) => (attributes.href ? { href: attributes.href } : {})
      }
    };
  },

  parseHTML() {
    return [
      { tag: 'a.mention[data-mention]', priority: 60 },
      // CKEditor's stock mention converter, used before the custom adapter landed.
      { tag: 'span.mention[data-mention]', priority: 60 }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes({ class: 'mention' }, HTMLAttributes), 0];
  }
});

export default MentionMark;
