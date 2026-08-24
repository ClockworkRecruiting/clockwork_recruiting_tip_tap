import type { Editor } from '@tiptap/core';
/** A single entry of the mention dropdown. Mirrors the CKEditor feed item contract. */
export interface MentionFeedItem {
    id: string;
    /** Text inserted into the document. Falls back to `name`, then `id`. */
    text?: string;
    name?: string;
    /** Marks the row as a drill-down row ("Candidates >"), not an insertable mention. */
    nestedFeedId?: string | null;
    /** True when the drill-down row is rendered as the header of a single-list view. */
    isNestedView?: boolean;
    isSingleView?: boolean;
    /** Drill-down rows only: whether clicking re-requests the feed. */
    isClickable?: boolean;
    /** Row is rendered but cannot be selected (headers, spinners, empty messages). */
    isDisabled?: boolean;
    /** Called before insertion / drill-down, with the clicked item. */
    onSelect?: (payload: {
        selectedItem: MentionFeedItem;
        marker: string;
    }) => void;
    /** Attributes persisted onto the mention anchor. */
    resourceType?: string;
    idValue?: string | number;
    link?: string;
    [key: string]: unknown;
}
export type MentionFeedUpdate = (items: MentionFeedItem[]) => void;
/**
 * Feed callback, identical to the signature the CKEditor build used:
 * returns the items to show immediately and may push more later through
 * `updateFeed` (used for pagination and for async loading spinners).
 */
export type MentionFeed = (text: string, clickedItem: MentionFeedItem | undefined, updateFeed: MentionFeedUpdate) => MentionFeedItem[] | Promise<MentionFeedItem[]> | void;
export interface MentionFeedConfig {
    marker: string;
    feed: MentionFeed;
    minimumCharacters?: number;
    itemRenderer?: (item: MentionFeedItem) => HTMLElement;
}
export interface ImageResizeOption {
    name: string;
    label: string;
    /** `null` restores the original width. */
    value: string | number | null;
}
export interface EditorImageConfig {
    styles?: string[];
    upload?: {
        types?: string[];
    };
    resizeUnit?: 'px' | '%';
    resizeOptions?: ImageResizeOption[];
}
export interface EditorLinkConfig {
    defaultProtocol?: string;
    addTargetToExternalLinks?: boolean;
}
/**
 * Accepts the same object the CKEditor build was configured with, so call sites
 * can keep passing CKEDITOR_CONFIG unchanged.
 */
export interface EditorConfig {
    toolbar?: string[];
    image?: EditorImageConfig;
    link?: EditorLinkConfig;
    placeholder?: string;
    language?: string;
    shouldNotGroupWhenFull?: boolean;
    mention?: {
        feeds?: MentionFeedConfig[];
    };
    typing?: {
        transformations?: {
            remove?: string[];
        };
    };
    /** Ignored: kept so existing CKEditor config objects pass through untouched. */
    removePlugins?: string[];
    /** Ignored: the CKEditor extra plugins are built into this package. */
    extraPlugins?: unknown[];
    [key: string]: unknown;
}
export interface UploadProgress {
    loaded: number;
    total: number;
}
/** Replaces the CKEditor upload adapter. Resolve with the public URL of the stored file. */
export type UploadHandler = (file: File, context: {
    onProgress: (progress: UploadProgress) => void;
    signal: AbortSignal;
}) => Promise<string | {
    url: string;
}>;
export interface ClockworkEditorApi {
    editor: Editor;
    /** CKEditor parity helpers, so wrappers can keep calling the same methods. */
    getData: () => string;
    setData: (html: string) => void;
    focus: () => void;
    destroy: () => void;
}
