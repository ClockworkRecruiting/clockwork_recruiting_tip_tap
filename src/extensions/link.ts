import { Link as TiptapLink } from '@tiptap/extension-link';
import { mergeAttributes } from '@tiptap/core';

const EXTERNAL_HREF = /^(https?:)?\/\//i;

export const isExternalHref = (href?: string | null): boolean => Boolean(href && EXTERNAL_HREF.test(href));

/** CKEditor's `link.defaultProtocol`: a bare host typed into the link field gets a protocol. */
export const withDefaultProtocol = (href: string, defaultProtocol = 'https://'): string => {
  const value = href.trim();
  if (!value) return value;
  if (/^(#|\/|mailto:|tel:)/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//')) return value;

  return `${defaultProtocol}${value}`;
};

export interface CkLinkOptions {
  addTargetToExternalLinks: boolean;
  defaultProtocol: string;
}

/**
 * CKEditor's Link with `addTargetToExternalLinks`: only absolute links get
 * `target`/`rel`, matching the anchors already stored in notes. Autolinking stays
 * off because the CKEditor build did not include the AutoLink plugin.
 */
export const CkLink = TiptapLink.extend<CkLinkOptions & Record<string, any>>({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
      autolink: false,
      linkOnPaste: true,
      defaultProtocol: 'https://',
      addTargetToExternalLinks: true,
      HTMLAttributes: {}
    };
  },

  renderHTML({ HTMLAttributes }) {
    const attributes: Record<string, unknown> = { ...HTMLAttributes };
    const external = isExternalHref(attributes.href as string);

    if (this.options.addTargetToExternalLinks && external) {
      attributes.target = '_blank';
      attributes.rel = 'noopener noreferrer';
    } else {
      delete attributes.target;
      delete attributes.rel;
    }

    return ['a', mergeAttributes(this.options.HTMLAttributes, attributes), 0];
  }
});

export default CkLink;
