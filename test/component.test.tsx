import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { ClockworkEditor } from '../src/ClockworkEditor';
import type { ClockworkEditorApi } from '../src/types';
import { APP_CONFIG } from './helpers';

const CONFIG = {
  ...APP_CONFIG,
  toolbar: [
    'bold',
    'italic',
    'underline',
    'fontsize',
    'highlight',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
    'link',
    'blockQuote',
    'removeFormat',
    'imageUpload',
    'imageStyle:alignLeft',
    'imageStyle:alignRight',
    'imageResize'
  ]
};

describe('<ClockworkEditor />', () => {
  it('renders the toolbar the app config asks for', () => {
    render(<ClockworkEditor content="<p>Hello</p>" config={CONFIG} />);

    ['Bold (Ctrl+B)', 'Italic (Ctrl+I)', 'Underline (Ctrl+U)', 'Font size', 'Highlight', 'Bulleted list', 'Numbered list', 'Increase indent', 'Decrease indent', 'Link (Ctrl+K)', 'Block quote', 'Remove format', 'Insert image', 'Left aligned image', 'Right aligned image', 'Resize image'].forEach(
      (label) => expect(screen.getByLabelText(label)).toBeTruthy()
    );
  });

  it('honours excludeToolbar, as the mass mailer does with highlight', () => {
    render(<ClockworkEditor content="" config={CONFIG} excludeToolbar={['highlight']} />);

    expect(screen.queryByLabelText('Highlight')).toBeNull();
    expect(screen.getByLabelText('Bold (Ctrl+B)')).toBeTruthy();
  });

  it('loads existing note HTML into the editable body', () => {
    const html = '<p>Spoke with <strong>Jane</strong></p><ul><li>Point</li></ul>';
    render(<ClockworkEditor content={html} config={CONFIG} />);

    const body = document.querySelector('.cw-editor__body');
    expect(body?.innerHTML).toContain('<strong>Jane</strong>');
    expect(body?.innerHTML).toContain('<li>');
  });

  it('emits CKEditor-shaped HTML on change', () => {
    const onChange = vi.fn();
    let api: ClockworkEditorApi | null = null;

    render(<ClockworkEditor content="<p>Start</p>" config={CONFIG} onChange={onChange} onReady={(ready) => { api = ready; }} />);

    act(() => {
      api!.editor.chain().selectAll().toggleBold().run();
    });

    expect(onChange).toHaveBeenCalledWith('<p><strong>Start</strong></p>');
  });

  it('applies the height and resize handle the note forms ask for', () => {
    render(<ClockworkEditor content="" config={CONFIG} height={420} resizable />);

    const scroll = document.querySelector('.cw-editor__scroll') as HTMLElement;
    expect(scroll.style.height).toBe('420px');
    expect(scroll.style.resize).toBe('vertical');
  });

  it('renders the placeholder and respects the disabled state', () => {
    const { rerender } = render(<ClockworkEditor content="" config={CONFIG} placeholder="Write a note" />);

    expect(document.querySelector('.cw-editor__body p')?.getAttribute('data-placeholder')).toBe('Write a note');

    rerender(<ClockworkEditor content="" config={CONFIG} placeholder="Write a note" disabled />);
    expect(document.querySelector('.cw-editor__body')?.getAttribute('contenteditable')).toBe('false');
  });

  it('writes content coming back from the store without clobbering local edits', () => {
    const onChange = vi.fn();
    let api: ClockworkEditorApi | null = null;
    const { rerender } = render(
      <ClockworkEditor content="<p>One</p>" config={CONFIG} onChange={onChange} onReady={(ready) => { api = ready; }} />
    );

    act(() => {
      api!.editor.commands.insertContent(' more');
    });

    const edited = api!.getData();
    // The store echoes back exactly what the editor produced: no reset.
    rerender(<ClockworkEditor content={edited} config={CONFIG} onChange={onChange} onReady={() => {}} />);
    expect(api!.getData()).toBe(edited);

    // A genuinely different value from elsewhere replaces the content.
    rerender(<ClockworkEditor content="<p>Replaced</p>" config={CONFIG} onChange={onChange} onReady={() => {}} />);
    expect(api!.getData()).toBe('<p>Replaced</p>');
  });

  it('opens the link panel with the input focused, and toggles it shut', () => {
    render(<ClockworkEditor content="<p>Start</p>" config={CONFIG} />);

    act(() => {
      screen.getByLabelText('Link (Ctrl+K)').click();
    });

    const panel = document.querySelector('.cw-panel--form');
    const input = panel?.querySelector('input');
    expect(panel).toBeTruthy();
    expect(document.activeElement).toBe(input);

    act(() => {
      screen.getByLabelText('Link (Ctrl+K)').click();
    });

    expect(document.querySelector('.cw-panel--form')).toBeNull();
  });

  it('reports the height of the element it sizes, not of any wrapper', () => {
    // jsdom has no ResizeObserver. Record every observer so the one watching the
    // scrolling area can be driven directly (the toolbar registers one too).
    const observers: Array<{ callback: (entries: Array<{ contentRect: { height: number } }>) => void; elements: Element[] }> = [];

    (window as any).ResizeObserver = class {
      private record: { callback: any; elements: Element[] };

      constructor(callback: any) {
        this.record = { callback, elements: [] };
        observers.push(this.record);
      }

      observe(element: Element) {
        this.record.elements.push(element);
      }

      disconnect() {}
    };

    const onResize = vi.fn();
    render(<ClockworkEditor content="" config={CONFIG} height={300} resizable onResize={onResize} />);

    const scroll = document.querySelector('.cw-editor__scroll');
    const scrollObserver = observers.find((observer) => observer.elements.includes(scroll!));
    expect(scrollObserver).toBeTruthy();

    const notify = (height: number) => scrollObserver!.callback([{ contentRect: { height } }]);

    act(() => {
      notify(412.4);
    });

    expect(onResize).toHaveBeenCalledWith(412);

    // The same height again is not reported: a host that echoes it back through
    // `height` must not start a feedback loop.
    onResize.mockClear();
    act(() => {
      notify(412);
    });
    expect(onResize).not.toHaveBeenCalled();

    delete (window as any).ResizeObserver;
  });

  it('moves toolbar groups into the overflow menu when the row runs out of room', () => {
    const observers: Array<{ callback: () => void; elements: Element[] }> = [];

    (window as any).ResizeObserver = class {
      private record: { callback: any; elements: Element[] };

      constructor(callback: any) {
        this.record = { callback, elements: [] };
        observers.push(this.record);
      }

      observe(element: Element) {
        this.record.elements.push(element);
      }

      disconnect() {}
    };

    render(<ClockworkEditor content="" config={CONFIG} />);

    const toolbar = document.querySelector('.cw-toolbar') as HTMLElement;
    expect(screen.getByLabelText('Highlight')).toBeTruthy();

    // jsdom reports no layout, so stand in for a toolbar narrower than its groups.
    Object.defineProperty(toolbar, 'clientWidth', { configurable: true, value: 120 });
    toolbar.querySelectorAll('[data-group]').forEach((group) => {
      Object.defineProperty(group, 'offsetWidth', { configurable: true, value: 100 });
    });

    const toolbarObserver = observers.find((observer) => observer.elements.includes(toolbar));
    act(() => {
      toolbarObserver!.callback();
    });

    expect(screen.getByLabelText('More options')).toBeTruthy();
    expect(screen.getByLabelText('Bold (Ctrl+B)')).toBeTruthy();
    expect(screen.queryByLabelText('Highlight')).toBeNull();

    delete (window as any).ResizeObserver;
  });

  it('keeps the mention feeds in sync when the app rebuilds them', () => {
    let api: ClockworkEditorApi | null = null;
    const firstFeed = vi.fn(() => []);
    const secondFeed = vi.fn(() => []);

    const { rerender } = render(
      <ClockworkEditor
        content=""
        config={{ ...CONFIG, mention: { feeds: [{ marker: '@', feed: firstFeed }] } }}
        onReady={(ready) => { api = ready; }}
      />
    );

    expect(api!.editor.storage.mentionSuggest.feeds[0].feed).toBe(firstFeed);

    rerender(<ClockworkEditor content="" config={{ ...CONFIG, mention: { feeds: [{ marker: '@', feed: secondFeed }] } }} onReady={() => {}} />);

    expect(api!.editor.storage.mentionSuggest.feeds[0].feed).toBe(secondFeed);
  });
});
