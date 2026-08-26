import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import type { MentionFeedConfig, MentionFeedItem } from '../../types';
import MentionDropdown from './dropdown';

export const mentionPluginKey = new PluginKey<MentionSuggestState | null>('cwMentionSuggest');

const FEED_DEBOUNCE_MS = 100;
const MAX_QUERY_LENGTH = 50;
/** Stand-in for block boundaries and atoms found inside the typed query. */
const LEAF_PLACEHOLDER = '\u0000';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Storage {
    mentionSuggest: MentionSuggestStorage;
  }
}

const isWordBoundary = (char: string): boolean => char === '' || /[\s(\["'\u00A0]/.test(char);

export const MentionSuggest = Extension.create<MentionSuggestOptions>({
  name: 'mentionSuggest',

  addOptions() {
    return { feeds: [] };
  },

  addStorage() {
    return { feeds: this.options.feeds as MentionFeedConfig[] };
  },

  addProseMirrorPlugins() {
    const { editor } = this;
    const storage = () => this.editor.storage.mentionSuggest;
    const feedFor = (marker: string) => storage().feeds.find((feed) => feed.marker === marker);

    let dropdown: MentionDropdown | null = null;
    let requestToken = 0;
    let lastRequestKey = '';
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const currentState = (view: EditorView) => mentionPluginKey.getState(view.state) || null;

    const closeSuggest = (view: EditorView) => {
      lastRequestKey = '';
      requestToken += 1;
      dropdown?.close();
      if (mentionPluginKey.getState(view.state)) view.dispatch(view.state.tr.setMeta(mentionPluginKey, null));
    };

    const insertMention = (view: EditorView, item: MentionFeedItem) => {
      const state = currentState(view);
      if (!state) return;

      const text = String(item.text || item.id || item.name || '');
      const attrs = {
        id: item.id,
        resourceType: item.resourceType ?? null,
        resourceId: item.idValue ?? null,
        href: item.link ?? null
      };

      const from = state.markerPos;
      const to = view.state.selection.head;

      requestToken += 1;
      lastRequestKey = '';
      dropdown?.close();

      editor
        .chain()
        .focus()
        .insertContentAt({ from, to }, [
          { type: 'text', text, marks: [{ type: 'mention', attrs }] },
          { type: 'text', text: ' ' }
        ])
        .command(({ tr }) => {
          tr.setMeta(mentionPluginKey, null);

          return true;
        })
        .run();
    };

    const handleSelect = (view: EditorView) => (item: MentionFeedItem) => {
      const state = currentState(view);
      if (!state) return;

      if (typeof item.onSelect === 'function') item.onSelect({ selectedItem: item, marker: state.marker });

      // Rows that only label a section (headers, spinners, empty messages) never insert.
      if (item.isDisabled) return;

      // Drill-down rows re-request the feed instead of inserting, which is how the
      // "Candidates >" / "People >" sub-lists work.
      if (item.nestedFeedId) {
        if (!item.isClickable) return;

        view.dispatch(
          view.state.tr.setMeta(mentionPluginKey, {
            ...state,
            clickedItem: item,
            clickCount: (state.clickCount ?? 0) + 1
          })
        );

        return;
      }

      insertMention(view, item);
    };

    const caretPosition = (view: EditorView, state: MentionSuggestState) => {
      try {
        const coords = view.coordsAtPos(state.markerPos);

        return { left: coords.left, top: coords.top, bottom: coords.bottom };
      } catch {
        // Measuring can fail while the view is mid-update; the panel is still
        // shown, just at the origin, and the next update repositions it.
        return { left: 0, top: 0, bottom: 0 };
      }
    };

    const renderItems = (view: EditorView, state: MentionSuggestState, items: MentionFeedItem[], preserveScroll: boolean) => {
      if (!dropdown) return;

      const config = feedFor(state.marker);
      dropdown.render(items, { itemRenderer: config?.itemRenderer, preserveScroll });

      if (!items.length) {
        dropdown.close();

        return;
      }

      dropdown.open(caretPosition(view, state));
      // CKEditor's fork focused the first row that is not a section header.
      if (!preserveScroll || dropdown.currentIndex === -1) dropdown.selectFirstSelectable();
    };

    const requestFeed = (view: EditorView, state: MentionSuggestState) => {
      const config = feedFor(state.marker);
      if (!config) return;

      if (state.query.length < (config.minimumCharacters ?? 0)) {
        dropdown?.close();

        return;
      }

      requestToken += 1;
      const token = requestToken;

      // Show a spinner straight away when there is nothing on screen yet, so
      // typing a marker never looks like it did nothing. A feed that returns its
      // own loading row synchronously replaces this immediately.
      if (!dropdown?.currentItems.length) {
        dropdown?.renderLoading();
        dropdown?.open(caretPosition(view, state));
      }

      const updateFeed = (items: MentionFeedItem[]) => {
        if (token !== requestToken) return;

        const latest = currentState(view);
        if (!latest) return;

        renderItems(view, latest, items || [], true);
      };

      const result = config.feed(state.query, state.clickedItem, updateFeed);

      Promise.resolve(result)
        .then((items) => {
          if (!Array.isArray(items) || token !== requestToken) return;

          const latest = currentState(view);
          if (!latest) return;

          renderItems(view, latest, items, false);
        })
        .catch(() => {
          if (token === requestToken) dropdown?.close();
        });
    };

    return [
      new Plugin<MentionSuggestState | null>({
        key: mentionPluginKey,

        state: {
          init: () => null,

          apply(tr, previous, _oldState, newState) {
            const meta = tr.getMeta(mentionPluginKey);
            if (meta !== undefined) return meta as MentionSuggestState | null;
            if (!previous) return null;

            const mapped = tr.mapping.mapResult(previous.markerPos);
            if (mapped.deleted) return null;

            const markerPos = mapped.pos;
            if (newState.doc.textBetween(markerPos, Math.min(markerPos + 1, newState.doc.content.size)) !== previous.marker) return null;

            const { selection } = newState;
            if (!selection.empty || selection.head <= markerPos) return null;

            const query = newState.doc.textBetween(markerPos + 1, selection.head, '\n', LEAF_PLACEHOLDER);
            if (query.includes('\n') || query.includes(LEAF_PLACEHOLDER) || query.length > MAX_QUERY_LENGTH) return null;

            return { ...previous, markerPos, query };
          }
        },

        appendTransaction(transactions, oldState, newState) {
          if (mentionPluginKey.getState(oldState)) return null;
          if (mentionPluginKey.getState(newState)) return null;

          const typing = transactions.some((tr) => tr.docChanged && !tr.getMeta('paste') && !tr.getMeta('uiEvent'));
          if (!typing || !newState.selection.empty) return null;

          const { head } = newState.selection;
          if (head < 1) return null;

          const markerChar = newState.doc.textBetween(head - 1, head);
          if (!feedFor(markerChar)) return null;

          // Only open when the marker was just typed at a word boundary, and never
          // inside a mention that already exists. This is the behaviour the
          // CKEditor fork added on top of the stock plugin.
          const charBeforeMarker = head >= 2 ? newState.doc.textBetween(head - 2, head - 1) : '';
          if (!isWordBoundary(charBeforeMarker)) return null;

          const mentionType = newState.schema.marks.mention;
          if (mentionType && mentionType.isInSet(newState.doc.resolve(head).marks())) return null;

          return newState.tr.setMeta(mentionPluginKey, { marker: markerChar, markerPos: head - 1, query: '' });
        },

        props: {
          handleKeyDown(view, event) {
            const state = mentionPluginKey.getState(view.state);
            if (!state || !dropdown?.isOpen) return false;

            if (event.key === 'ArrowDown') {
              dropdown.moveSelection(1);

              return true;
            }

            if (event.key === 'ArrowUp') {
              dropdown.moveSelection(-1);

              return true;
            }

            if (event.key === 'Escape') {
              closeSuggest(view);

              return true;
            }

            if (event.key === 'Enter' || event.key === 'Tab') {
              const item = dropdown.currentItems[dropdown.currentIndex];
              if (!item) return false;

              handleSelect(view)(item);

              return true;
            }

            return false;
          },

          handleDOMEvents: {
            blur: (view) => {
              // The dropdown cancels mousedown, so a blur here means focus really left.
              closeSuggest(view);

              return false;
            }
          }
        },

        view(editorView) {
          dropdown = new MentionDropdown({ onSelect: (item) => handleSelect(editorView)(item) });

          return {
            update(view, previousState) {
              const state = mentionPluginKey.getState(view.state);
              const previous = mentionPluginKey.getState(previousState);

              if (!state) {
                if (previous) {
                  lastRequestKey = '';
                  dropdown?.close();
                }

                return;
              }

              if (dropdown?.isOpen) dropdown.setPosition(caretPosition(view, state));

              const requestKey = `${state.marker}|${state.query}|${state.clickCount ?? 0}`;
              if (requestKey === lastRequestKey) return;

              lastRequestKey = requestKey;
              if (debounceTimer) clearTimeout(debounceTimer);
              debounceTimer = setTimeout(() => requestFeed(view, state), FEED_DEBOUNCE_MS);
            },

            destroy() {
              if (debounceTimer) clearTimeout(debounceTimer);
              dropdown?.destroy();
              dropdown = null;
            }
          };
        }
      })
    ];
  }
});

export default MentionSuggest;
