export declare const isExternalHref: (href?: string | null) => boolean;
/** CKEditor's `link.defaultProtocol`: a bare host typed into the link field gets a protocol. */
export declare const withDefaultProtocol: (href: string, defaultProtocol?: string) => string;
export interface CkLinkOptions {
    addTargetToExternalLinks: boolean;
    defaultProtocol: string;
}
/**
 * CKEditor's Link with `addTargetToExternalLinks`: only absolute links get
 * `target`/`rel`, matching the anchors already stored in notes. Autolinking stays
 * off because the CKEditor build did not include the AutoLink plugin.
 */
export declare const CkLink: import("@tiptap/core").Mark<CkLinkOptions & Record<string, any>, any>;
export default CkLink;
