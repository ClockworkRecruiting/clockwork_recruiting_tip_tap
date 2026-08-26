import type { MentionFeedItem } from '../../types';
export interface DropdownCallbacks {
    onSelect: (item: MentionFeedItem, index: number) => void;
}
export declare class MentionDropdown {
    private panel;
    private list;
    private items;
    private selectedIndex;
    private callbacks;
    constructor(callbacks: DropdownCallbacks);
    get isOpen(): boolean;
    get currentItems(): MentionFeedItem[];
    get currentIndex(): number;
    private renderRow;
    render(items: MentionFeedItem[], options?: {
        itemRenderer?: (item: MentionFeedItem) => HTMLElement;
        preserveScroll?: boolean;
    }): void;
    /** Mirrors the CKEditor fork's `selectFirst(firstFocusIndex)`: skip header rows. */
    selectIndex(index: number, { scroll }?: {
        scroll?: boolean;
    }): void;
    /**
     * Scrolls the list vertically only. `scrollIntoView` also adjusts the
     * horizontal offset, which shifts the rows sideways and cuts the start off
     * every label.
     */
    private scrollRowIntoView;
    selectFirstSelectable(startAt?: number): void;
    moveSelection(direction: 1 | -1): void;
    /** Shown while the first page of a feed is in flight and there is nothing yet. */
    renderLoading(): void;
    open(position: {
        left: number;
        top: number;
        bottom: number;
    }): void;
    setPosition({ left, top, bottom }: {
        left: number;
        top: number;
        bottom: number;
    }): void;
    close(): void;
    destroy(): void;
}
export default MentionDropdown;
