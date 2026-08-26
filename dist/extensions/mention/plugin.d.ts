import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import type { MentionFeedConfig, MentionFeedItem } from '../../types';
export declare const mentionPluginKey: PluginKey<MentionSuggestState | null>;
export interface MentionSuggestState {
    marker: string;
    /** Document position of the marker character itself. */
    markerPos: number;
    query: string;
    /** Set while a drill-down ("Candidates >") list is open. */
    clickedItem?: MentionFeedItem;
    /**
     * Bumped on every drill-down or back click. The row that opens a section and
     * the row that leaves it are the same item with the same id, so without this
     * the second click would look like a repeat of the first and be skipped.
     */
    clickCount?: number;
}
export interface MentionSuggestOptions {
    feeds: MentionFeedConfig[];
}
export interface MentionSuggestStorage {
    /** Re-assigned by the React wrapper whenever the app rebuilds its feeds. */
    feeds: MentionFeedConfig[];
}
declare module '@tiptap/core' {
    interface Storage {
        mentionSuggest: MentionSuggestStorage;
    }
}
export declare const MentionSuggest: Extension<MentionSuggestOptions, any>;
export default MentionSuggest;
