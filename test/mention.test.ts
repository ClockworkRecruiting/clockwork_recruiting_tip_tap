import { act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MentionDropdown, mentionPluginKey } from '../src/extensions/mention';
import serializeToCkHtml from '../src/html/serialize';
import { createEditor, APP_CONFIG } from './helpers';
import type { MentionFeedItem } from '../src/types';

const NESTED_ROW: MentionFeedItem = {
  id: 'peopleMentionView',
  name: 'People',
  nestedFeedId: 'people',
  isNestedView: true,
  isClickable: true
};

const PERSON: MentionFeedItem = {
  id: '@Jane Doe',
  name: 'Jane Doe',
  idValue: '42',
  resourceType: 'Person',
  link: 'https://app.test/firm/people/42'
};

/** Mirrors the app's `customItemRenderer`, including its spinner rows. */
const itemRenderer = (item: MentionFeedItem) => {
  if (item.id === 'loading-spinner' || item.id === 'pagination-spinner') {
    const spinner = document.createElement('div');
    spinner.className = item.id === 'pagination-spinner' ? 'pagination-loading' : 'feed-loading';
    spinner.innerHTML = '<div class="loading-spinner"></div>';

    return spinner;
  }

  const element = document.createElement('span');
  element.className = item.nestedFeedId ? 'mention-list-item--list-type' : 'mention-list-item';
  element.textContent = String(item.name || item.id);

  return element;
};

const editorWithFeed = (feed: any) =>
  createEditor('<p></p>', {
    ...APP_CONFIG,
    mention: { feeds: [{ marker: '@', feed, minimumCharacters: 0, itemRenderer }] }
  });

const flush = async (ms = 150) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

const openRows = () => Array.from(document.querySelectorAll('.ck-mentions .ck-list__item'));

afterEach(() => {
  document.querySelectorAll('.ck-body-wrapper').forEach((node) => node.remove());
});

describe('mention triggering', () => {
  it('opens only when the marker is typed', () => {
    const editor = editorWithFeed(() => [PERSON]);

    editor.commands.insertContent('@');
    expect(mentionPluginKey.getState(editor.state)).toMatchObject({ marker: '@', query: '' });

    editor.destroy();
  });

  it('tracks the typed query, spaces included', () => {
    const editor = editorWithFeed(() => [PERSON]);

    editor.commands.insertContent('@');
    editor.commands.insertContent('jane d');

    expect(mentionPluginKey.getState(editor.state)?.query).toBe('jane d');

    editor.destroy();
  });

  it('does not open in the middle of a word', () => {
    const editor = editorWithFeed(() => [PERSON]);

    editor.commands.insertContent('email');
    editor.commands.insertContent('@');

    expect(mentionPluginKey.getState(editor.state)).toBeNull();

    editor.destroy();
  });

  it('closes when the marker is deleted', () => {
    const editor = editorWithFeed(() => [PERSON]);

    editor.commands.insertContent('@');
    editor.commands.deleteRange({ from: editor.state.selection.head - 1, to: editor.state.selection.head });

    expect(mentionPluginKey.getState(editor.state)).toBeNull();

    editor.destroy();
  });
});

describe('mention dropdown', () => {
  it('renders the feed rows with the CKEditor class contract', async () => {
    const editor = editorWithFeed(() => [NESTED_ROW, PERSON]);

    editor.commands.insertContent('@');
    await flush();

    const rows = openRows();
    expect(rows).toHaveLength(2);
    expect(rows[0].firstElementChild?.className).toContain('ck-button');
    expect(rows[1].firstElementChild?.className).toContain('mention-list-item');

    editor.destroy();
  });

  it('selects the first row that is not a section header', async () => {
    const editor = editorWithFeed(() => [NESTED_ROW, PERSON]);

    editor.commands.insertContent('@');
    await flush();

    const rows = openRows();
    expect(rows[0].firstElementChild?.classList.contains('ck-on')).toBe(false);
    expect(rows[1].firstElementChild?.classList.contains('ck-on')).toBe(true);

    editor.destroy();
  });

  it('accepts rows pushed later through the update callback, as pagination does', async () => {
    const feed = (_text: string, _clicked: unknown, updateFeed: (items: MentionFeedItem[]) => void) => {
      setTimeout(() => updateFeed([NESTED_ROW, PERSON, { ...PERSON, id: '@John Roe', name: 'John Roe', idValue: '43' }]), 10);

      return [{ id: 'loading-spinner', name: 'loading', isDisabled: true }];
    };

    const editor = editorWithFeed(feed);

    editor.commands.insertContent('@');
    await flush(200);

    expect(openRows()).toHaveLength(3);

    editor.destroy();
  });

  it('re-requests the feed for a drill-down row instead of inserting it', async () => {
    const feed = vi.fn((_text: string, _clickedItem?: MentionFeedItem) => [NESTED_ROW, PERSON]);
    const editor = editorWithFeed(feed);

    editor.commands.insertContent('@');
    await flush();

    (openRows()[0].firstElementChild as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await flush();

    expect(feed).toHaveBeenCalledTimes(2);
    expect(feed.mock.calls[1][1]).toMatchObject({ nestedFeedId: 'people' });
    expect(editor.getHTML()).not.toContain('mention');

    editor.destroy();
  });

  it('inserts the CKEditor mention anchor when a person row is picked', async () => {
    const editor = editorWithFeed(() => [NESTED_ROW, PERSON]);

    editor.commands.insertContent('@');
    await flush();

    (openRows()[1].firstElementChild as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    const html = serializeToCkHtml(editor.getHTML());
    expect(html).toContain('class="mention"');
    expect(html).toContain('data-mention="@Jane Doe"');
    expect(html).toContain('data-resource-type="Person"');
    expect(html).toContain('data-resource-id="42"');
    expect(html).toContain('href="https://app.test/firm/people/42"');
    expect(html).toContain('@Jane Doe');
    expect(mentionPluginKey.getState(editor.state)).toBeNull();

    editor.destroy();
  });

  it('goes back out of a section, even though the back row is the same item', async () => {
    // Drilling in and coming back out are the same row: same id, same
    // nestedFeedId, only the view flags differ.
    const IN_ROW = { ...NESTED_ROW, isNestedView: true, isSingleView: false };
    const BACK_ROW = { ...NESTED_ROW, isNestedView: false, isSingleView: true };

    const feed = vi.fn((_text: string, clickedItem?: MentionFeedItem) =>
      clickedItem?.isNestedView ? [BACK_ROW, PERSON] : [IN_ROW, PERSON]
    );

    const editor = editorWithFeed(feed);

    editor.commands.insertContent('@');
    await flush();

    // Into the section.
    (openRows()[0].firstElementChild as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await flush();
    expect(feed).toHaveBeenCalledTimes(2);
    expect(feed.mock.calls[1][1]).toMatchObject({ isNestedView: true });

    // Back out again.
    (openRows()[0].firstElementChild as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await flush();
    expect(feed).toHaveBeenCalledTimes(3);
    expect(feed.mock.calls[2][1]).toMatchObject({ isSingleView: true });

    editor.destroy();
  });

  it('grows the list for each page a paginating feed pushes, keeping the row the host observes', async () => {
    const page = (from: number, count: number) =>
      Array.from({ length: count }, (_unused, index) => ({
        ...PERSON,
        id: `@Person ${from + index}`,
        name: `Person ${from + index}`,
        idValue: String(from + index)
      }));

    const spinnerRow = { id: 'pagination-spinner', name: 'pagination-spinner', isDisabled: true };
    let pushMore: ((items: MentionFeedItem[]) => void) | null = null;

    const feed = (_text: string, _clickedItem: unknown, updateFeed: (items: MentionFeedItem[]) => void) => {
      pushMore = updateFeed;

      return [NESTED_ROW, ...page(1, 3), spinnerRow];
    };

    const editor = editorWithFeed(feed);

    editor.commands.insertContent('@');
    await flush();

    expect(openRows()).toHaveLength(5);
    expect(document.querySelector('.pagination-loading')).toBeTruthy();

    // What the host's IntersectionObserver handler does when the next page lands.
    const list = document.querySelector('.cw-mentions') as HTMLElement;
    list.scrollTop = 24;

    act(() => {
      pushMore!([NESTED_ROW, ...page(1, 6), spinnerRow]);
    });

    expect(openRows()).toHaveLength(8);
    expect(document.querySelector('.pagination-loading')).toBeTruthy();
    // The list must not jump back to the top between pages.
    expect(list.scrollTop).toBe(24);

    editor.destroy();
  });

  it('shows a loader while the first page is in flight', async () => {
    const editor = editorWithFeed(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve([NESTED_ROW, PERSON]), 60);
        })
    );

    editor.commands.insertContent('@');
    await flush(120);

    expect(document.querySelector('.cw-mentions__loading')).toBeTruthy();

    await flush(120);

    expect(document.querySelector('.cw-mentions__loading')).toBeNull();
    expect(openRows()).toHaveLength(2);

    editor.destroy();
  });

  it('never scrolls the list sideways, which would clip the row labels', async () => {
    const editor = editorWithFeed(() => [NESTED_ROW, PERSON]);

    editor.commands.insertContent('@');
    await flush();

    const list = document.querySelector('.cw-mentions') as HTMLElement;
    list.scrollLeft = 40;

    editor.view.someProp('handleKeyDown', (handler) => handler(editor.view, new KeyboardEvent('keydown', { key: 'ArrowDown' })));

    expect(list.scrollLeft).toBe(0);

    editor.destroy();
  });

  it('keeps the panel on screen whichever edge the caret is near', () => {
    const dropdown = new MentionDropdown({ onSelect: () => {} });
    dropdown.render([PERSON], { itemRenderer });

    const panelWidth = 360; // jsdom reports no layout, so the fallback width applies
    const margin = 8;

    dropdown.open({ left: 5000, top: 100, bottom: 120 });
    const panel = document.querySelector('.cw-mentions-panel') as HTMLElement;
    expect(panel.style.left).toBe(`${Math.max(margin, window.innerWidth - panelWidth - margin)}px`);

    dropdown.setPosition({ left: -200, top: 100, bottom: 120 });
    expect(panel.style.left).toBe(`${margin}px`);

    dropdown.destroy();
  });

  it('never inserts a disabled row', async () => {
    const editor = editorWithFeed(() => [{ id: 'empty', message: 'No results', isDisabled: true }]);

    editor.commands.insertContent('@');
    await flush();

    (openRows()[0].firstElementChild as HTMLElement).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(editor.getHTML()).not.toContain('mention');

    editor.destroy();
  });
});
