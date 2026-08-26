import type { MentionFeedItem } from '../../types';

/**
 * The mention dropdown.
 *
 * The DOM is deliberately the same shape CKEditor's MentionsView produced
 * (`.ck-body-wrapper > .ck-balloon-panel > ul.ck-mentions > li.ck-list__item >
 * .ck-button`), because the app styles those class names in `_mixins.scss` and
 * `useMentions` reaches into `.ck-list__item` and `.pagination-loading` to drive
 * its own pagination. Keeping the contract means no app-side changes.
 */
const BODY_WRAPPER_CLASS = 'ck-body-wrapper';

const bodyWrapper = (): HTMLElement => {
  const existing = document.querySelector<HTMLElement>(`.${BODY_WRAPPER_CLASS}`);
  if (existing) return existing;

  const wrapper = document.createElement('div');
  wrapper.className = `ck ${BODY_WRAPPER_CLASS}`;
  document.body.appendChild(wrapper);

  return wrapper;
};

const defaultItemRenderer = (item: MentionFeedItem): HTMLElement => {
  const element = document.createElement('span');
  element.className = 'mention-list-item';
  element.textContent = String(item.text || item.name || item.id || '');

  return element;
};

export interface DropdownCallbacks {
  onSelect: (item: MentionFeedItem, index: number) => void;
}

export class MentionDropdown {
  private panel: HTMLElement;

  private list: HTMLElement;

  private items: MentionFeedItem[] = [];

  private selectedIndex = -1;

  private callbacks: DropdownCallbacks;

  constructor(callbacks: DropdownCallbacks) {
    this.callbacks = callbacks;

    this.panel = document.createElement('div');
    this.panel.className = 'ck ck-reset_all ck-balloon-panel ck-balloon-panel_visible cw-mentions-panel';

    this.list = document.createElement('ul');
    this.list.className = 'ck ck-reset ck-list ck-mentions cw-mentions';
    this.panel.appendChild(this.list);
  }

  get isOpen(): boolean {
    return this.panel.isConnected;
  }

  get currentItems(): MentionFeedItem[] {
    return this.items;
  }

  get currentIndex(): number {
    return this.selectedIndex;
  }

  private renderRow(item: MentionFeedItem, index: number, itemRenderer?: (item: MentionFeedItem) => HTMLElement): HTMLElement {
    const row = document.createElement('li');
    row.className = 'ck ck-list__item';

    const button = (itemRenderer || defaultItemRenderer)(item);
    // CKEditor's DomWrapperView put the button classes on the rendered element
    // itself, which is what the app's `!important` rules key off.
    button.classList.add('ck', 'ck-button');
    if (item.isDisabled) button.classList.add('ck-disabled');
    if (index === this.selectedIndex) button.classList.add('ck-on');

    button.addEventListener('mousedown', (event) => {
      // Keep the editor selection intact: CKEditor selected on mousedown too.
      event.preventDefault();
      event.stopPropagation();
      this.callbacks.onSelect(item, index);
    });

    row.appendChild(button);

    return row;
  }

  render(items: MentionFeedItem[], options: { itemRenderer?: (item: MentionFeedItem) => HTMLElement; preserveScroll?: boolean } = {}): void {
    const scrollTop = this.list.scrollTop;

    this.items = items;
    if (this.selectedIndex >= items.length) this.selectedIndex = -1;

    this.list.textContent = '';
    items.forEach((item, index) => this.list.appendChild(this.renderRow(item, index, options.itemRenderer)));

    if (options.preserveScroll) this.list.scrollTop = scrollTop;
  }

  /** Mirrors the CKEditor fork's `selectFirst(firstFocusIndex)`: skip header rows. */
  selectIndex(index: number, { scroll = true }: { scroll?: boolean } = {}): void {
    this.selectedIndex = index;

    Array.from(this.list.children).forEach((row, rowIndex) => {
      const button = row.firstElementChild;
      if (!button) return;

      button.classList.toggle('ck-on', rowIndex === index);
    });

    if (!scroll || index < 0) return;

    this.scrollRowIntoView(index);
  }

  /**
   * Scrolls the list vertically only. `scrollIntoView` also adjusts the
   * horizontal offset, which shifts the rows sideways and cuts the start off
   * every label.
   */
  private scrollRowIntoView(index: number): void {
    const row = this.list.children[index] as HTMLElement | undefined;
    if (!row) return;

    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;

    if (top < this.list.scrollTop) this.list.scrollTop = top;
    else if (bottom > this.list.scrollTop + this.list.clientHeight) this.list.scrollTop = bottom - this.list.clientHeight;

    this.list.scrollLeft = 0;
  }

  selectFirstSelectable(startAt = 0): void {
    const index = this.items.findIndex((item, position) => position >= startAt && !item.isDisabled && !item.nestedFeedId);

    this.selectIndex(index === -1 ? this.items.findIndex((item) => !item.isDisabled) : index);
  }

  moveSelection(direction: 1 | -1): void {
    const total = this.items.length;
    if (!total) return;

    const selectable = (index: number) => !this.items[index]?.isDisabled;

    let next = this.selectedIndex;
    for (let step = 0; step < total; step += 1) {
      next = (next + direction + total) % total;
      if (selectable(next)) break;
    }

    this.selectIndex(next);
  }

  /** Shown while the first page of a feed is in flight and there is nothing yet. */
  renderLoading(): void {
    this.items = [];
    this.selectedIndex = -1;
    this.list.textContent = '';

    const row = document.createElement('li');
    row.className = 'ck ck-list__item';

    const body = document.createElement('div');
    body.className = 'cw-mentions__loading';
    body.setAttribute('aria-live', 'polite');

    const spinner = document.createElement('span');
    spinner.className = 'cw-mentions__spinner';

    const label = document.createElement('span');
    label.textContent = 'Searching';

    body.append(spinner, label);
    row.appendChild(body);
    this.list.appendChild(row);
  }

  open(position: { left: number; top: number; bottom: number }): void {
    if (!this.panel.isConnected) bodyWrapper().appendChild(this.panel);
    this.setPosition(position);
  }

  setPosition({ left, top, bottom }: { left: number; top: number; bottom: number }): void {
    const margin = 8;
    const panelHeight = this.panel.offsetHeight || 320;
    const panelWidth = this.panel.offsetWidth || 360;
    const spaceBelow = window.innerHeight - bottom;
    const openUpwards = spaceBelow < panelHeight && top > panelHeight;

    // Keep the whole panel on screen: a caret near the right edge would otherwise
    // push it out of view, and one near the left would clip its start.
    const maxLeft = Math.max(margin, window.innerWidth - panelWidth - margin);
    const clampedLeft = Math.min(Math.max(left, margin), maxLeft);

    this.panel.style.position = 'absolute';
    this.panel.style.left = `${Math.round(clampedLeft + window.scrollX)}px`;
    this.panel.style.top = openUpwards
      ? `${Math.round(top + window.scrollY - panelHeight)}px`
      : `${Math.round(bottom + window.scrollY)}px`;
    this.panel.classList.toggle('cw-mentions-panel--above', openUpwards);
  }

  close(): void {
    this.panel.remove();
    this.list.textContent = '';
    this.items = [];
    this.selectedIndex = -1;
  }

  destroy(): void {
    this.close();
    this.panel.remove();
  }
}

export default MentionDropdown;
