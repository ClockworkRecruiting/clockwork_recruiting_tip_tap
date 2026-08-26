import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import type { Editor } from '@tiptap/core';

import buildExtensions from './config/extensions';
import Toolbar from './toolbar/Toolbar';
import { fontSizeClassForPx } from './extensions/fontSize';
import normalizeIncomingHtml from './html/normalize';
import serializeToCkHtml from './html/serialize';
import type { ClockworkEditorApi, EditorConfig, UploadHandler } from './types';

export interface ClockworkEditorProps {
  id?: string;
  /** Note HTML. Accepts everything the CKEditor build produced. */
  content?: string;
  onChange?: (html: string) => void;
  /** The CKEditor config object; passed through as-is. */
  config?: EditorConfig;
  /** Toolbar item names to hide, using the same names as `config.toolbar`. */
  excludeToolbar?: string[];
  placeholder?: string;
  disabled?: boolean;
  /** Ctrl/Cmd+Enter handler, i.e. "submit the note". */
  onReturn?: () => void;
  onReady?: (api: ClockworkEditorApi) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  upload?: UploadHandler | null;
  onUploadError?: (message: string) => void;
  /** Height of the scrolling content area, in px. */
  height?: number;
  resizable?: boolean;
  /**
   * Reports the height of the scrolling content area after the user drags the
   * resize handle. It is the height of the very element `height` sizes, so
   * feeding the value back in through `height` is stable: measuring an outer
   * element instead would grow the editor on every round trip.
   */
  onResize?: (height: number) => void;
  className?: string;
  autoFocus?: boolean;
  /** Forces the content prop back into the editor, like CKEditor's `setData`. */
  enforcedUpdate?: boolean;
}

const DEFAULT_TOOLBAR = [
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
];

const normalize = (html?: string): string => normalizeIncomingHtml(html || '', { fontSizeClassForPx });

export const ClockworkEditor = forwardRef<ClockworkEditorApi | null, ClockworkEditorProps>(
  (
    {
      id,
      content = '',
      onChange,
      config = {},
      excludeToolbar = [],
      placeholder,
      disabled = false,
      onReturn,
      onReady,
      onFocus,
      onBlur,
      upload = null,
      onUploadError,
      height = 300,
      resizable = false,
      onResize,
      className,
      autoFocus = false,
      enforcedUpdate = false
    },
    ref
  ) => {
    // Kept in refs so the editor is created once: swapping the instance would
    // drop focus, undo history and any in-flight upload.
    const onChangeRef = useRef(onChange);
    const onReturnRef = useRef(onReturn);
    const uploadRef = useRef(upload);
    const onResizeRef = useRef(onResize);
    const lastEmittedRef = useRef<string>(content);
    const scrollRef = useRef<HTMLDivElement>(null);

    onChangeRef.current = onChange;
    onReturnRef.current = onReturn;
    uploadRef.current = upload;
    onResizeRef.current = onResize;

    const initialContent = useMemo(() => normalize(content), []);

    const editor = useEditor({
      extensions: buildExtensions({
        config,
        placeholder,
        upload: (file, context) => {
          const handler = uploadRef.current;
          if (!handler) return Promise.reject(new Error('Image upload is not configured for this editor.'));

          return Promise.resolve(handler(file, context));
        },
        onSubmit: () => onReturnRef.current?.(),
        onUploadError
      }),
      content: initialContent,
      editable: !disabled,
      autofocus: autoFocus,
      editorProps: {
        attributes: {
          // `ck-content` is kept so the app's existing note styles still apply.
          class: 'cw-editor__body ck-content',
          ...(id ? { id } : {})
        }
      },
      onUpdate: ({ editor: instance }) => {
        const html = serializeToCkHtml(instance.getHTML());
        lastEmittedRef.current = html;
        onChangeRef.current?.(html);
      },
      onFocus: () => onFocus?.(),
      onBlur: () => onBlur?.()
    });

    const api = useMemo<ClockworkEditorApi | null>(() => {
      if (!editor) return null;

      return {
        editor,
        getData: () => serializeToCkHtml(editor.getHTML()),
        setData: (html: string) => {
          lastEmittedRef.current = html;
          editor.commands.setContent(normalize(html), { emitUpdate: false });
        },
        focus: () => editor.commands.focus(),
        destroy: () => editor.destroy()
      };
    }, [editor]);

    useImperativeHandle(ref, () => api as ClockworkEditorApi, [api]);

    useEffect(() => {
      if (api) onReady?.(api);
    }, [api]);

    // Mention feeds are rebuilt on every render by the app's `useMentions` hook,
    // so they are handed to the plugin through storage rather than options.
    useEffect(() => {
      if (!editor) return;

      editor.storage.mentionSuggest.feeds = config.mention?.feeds || [];
    }, [editor, config.mention?.feeds]);

    useEffect(() => {
      if (!editor) return;

      editor.setEditable(!disabled);
    }, [editor, disabled]);

    useEffect(() => {
      if (!editor) return;

      const placeholderExtension = editor.extensionManager.extensions.find((extension) => extension.name === 'placeholder');
      if (!placeholderExtension) return;

      placeholderExtension.options.placeholder = placeholder || config.placeholder || '';
      // Repaint the placeholder decoration.
      editor.view.dispatch(editor.state.tr);
    }, [editor, placeholder, config.placeholder]);

    // Content coming back from the store: only written when it actually differs
    // from what this editor last produced, so typing is never interrupted.
    useEffect(() => {
      if (!editor) return;
      if (content === lastEmittedRef.current && !enforcedUpdate) return;
      if (!enforcedUpdate && content === serializeToCkHtml(editor.getHTML())) return;

      lastEmittedRef.current = content;
      editor.commands.setContent(normalize(content), { emitUpdate: false });
    }, [editor, content, enforcedUpdate]);

    const toolbarItems = useMemo(() => {
      const items = config.toolbar?.length ? config.toolbar : DEFAULT_TOOLBAR;

      return items.filter((item) => !excludeToolbar.includes(item));
    }, [config.toolbar, excludeToolbar]);

    const contentStyle = useMemo(
      () => ({
        height: `${height}px`,
        ...(resizable ? { resize: 'vertical' as const, width: '100%' } : {})
      }),
      [height, resizable]
    );

    // Watches the element that `height` sizes, so a host that persists the
    // reported height cannot feed a larger box back in.
    useEffect(() => {
      const element = scrollRef.current;
      if (!element || !window.ResizeObserver) return;

      let lastReported = element.getBoundingClientRect().height;

      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;

        const next = Math.round(entry.contentRect.height);
        if (!next || next === Math.round(lastReported)) return;

        lastReported = next;
        onResizeRef.current?.(next);
      });

      observer.observe(element);

      return () => observer.disconnect();
    }, []);

    const handleShellMouseDown = useCallback(() => {
      if (editor && !editor.isFocused && !disabled) editor.commands.focus();
    }, [editor, disabled]);

    if (!editor) return null;

    return (
      <div className={`cw-editor${disabled ? ' cw-editor--disabled' : ''}${className ? ` ${className}` : ''}`} data-editor="tiptap">
        <Toolbar editor={editor as Editor} items={toolbarItems} config={config} />
        <div className="cw-editor__scroll" ref={scrollRef} style={contentStyle} onMouseDown={handleShellMouseDown}>
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }
);

ClockworkEditor.displayName = 'ClockworkEditor';

export default ClockworkEditor;
