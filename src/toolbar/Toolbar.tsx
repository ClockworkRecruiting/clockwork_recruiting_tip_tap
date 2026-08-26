import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Editor } from '@tiptap/core';
import type { EditorConfig, ImageResizeOption } from '../types';
import { FONT_SIZE_PRESETS } from '../extensions/fontSize';
import { HIGHLIGHT_OPTIONS } from '../extensions/highlight';
import { withDefaultProtocol } from '../extensions/link';
import { SPECIAL_CHARACTER_GROUPS } from '../extensions/specialCharacters';
import {
  AlignLeftIcon,
  AlignRightIcon,
  BlockQuoteIcon,
  BoldIcon,
  BulletedListIcon,
  CheckIcon,
  FontSizeIcon,
  HighlightIcon,
  ImageInsertIcon,
  ImageResizeIcon,
  ImageUploadIcon,
  IndentIcon,
  ItalicIcon,
  LinkIcon,
  MoreIcon,
  NumberedListIcon,
  OutdentIcon,
  RedoIcon,
  RemoveFormatIcon,
  SpecialCharactersIcon,
  TrashIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon
} from './icons';

const DEFAULT_RESIZE_OPTIONS: ImageResizeOption[] = [
  { name: 'resizeImage:original', label: 'Original', value: null },
  { name: 'resizeImage:150', label: '150px', value: '150' },
  { name: 'resizeImage:250', label: '250px', value: '250' }
];

/**
 * Items are laid out in the order the config asks for, but adjacent items of the
 * same kind travel together: a group is the unit that moves into the overflow
 * menu when the toolbar runs out of room, so related controls never split up.
 */
const ITEM_GROUP: Record<string, string> = {
  bold: 'text',
  italic: 'text',
  underline: 'text',
  fontsize: 'style',
  highlight: 'style',
  bulletedlist: 'list',
  numberedlist: 'list',
  outdent: 'indent',
  indent: 'indent',
  link: 'insert',
  blockquote: 'insert',
  removeformat: 'insert',
  imageupload: 'image',
  imageinsert: 'image',
  'imagestyle:alignleft': 'image',
  'imagestyle:alignright': 'image',
  imageresize: 'image',
  specialcharacters: 'extra',
  undo: 'history',
  redo: 'history'
};

interface ButtonProps {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  hasCaret?: boolean;
  children: ReactNode;
}

const ToolbarButton = ({ title, onClick, isActive = false, isDisabled = false, hasCaret = false, children }: ButtonProps) => (
  <button
    type="button"
    className={`cw-btn${isActive ? ' cw-btn--on' : ''}${hasCaret ? ' cw-btn--caret' : ''}`}
    title={title}
    aria-label={title}
    aria-pressed={isActive}
    disabled={isDisabled}
    // Keep the document selection while the button is pressed.
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    <span className="cw-btn__icon">{children}</span>
    {hasCaret && <span className="cw-btn__caret" aria-hidden="true" />}
  </button>
);

const useDismiss = (onDismiss: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDismiss]);

  return ref;
};

/**
 * Panels open below their button, left aligned, and flip or slide back into view
 * when that would put them past the right edge of the window.
 */
const usePanelPosition = (isOpen: boolean) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState<{ alignRight: boolean; offset: number }>({ alignRight: false, offset: 0 });

  useLayoutEffect(() => {
    if (!isOpen) {
      setShift({ alignRight: false, offset: 0 });

      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    const margin = 12;
    const rect = panel.getBoundingClientRect();

    if (rect.right <= window.innerWidth - margin) return;

    // Right aligning is enough in most places; when the panel is wider than the
    // space to the left of its button, nudge it instead so it stays on screen.
    const anchor = panel.parentElement?.getBoundingClientRect();
    const alignedRight = anchor ? anchor.right - rect.width : rect.left;

    if (alignedRight >= margin) setShift({ alignRight: true, offset: 0 });
    else setShift({ alignRight: false, offset: Math.round(margin - alignedRight) });
  }, [isOpen]);

  return {
    panelRef,
    panelClassName: shift.alignRight ? ' cw-panel--right' : '',
    panelStyle: shift.offset ? { transform: `translateX(${-shift.offset}px)` } : undefined
  };
};

/** Focus without scrolling: note forms are themselves inside scroll containers. */
const focusWithoutScroll = (input: HTMLInputElement | null) => input?.focus({ preventScroll: true });

interface DropdownProps {
  title: string;
  icon: ReactNode;
  isActive?: boolean;
  panelClass?: string;
  children: (close: () => void) => ReactNode;
}

const ToolbarDropdown = ({ title, icon, isActive = false, panelClass = '', children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const ref = useDismiss(close);
  const { panelRef, panelClassName, panelStyle } = usePanelPosition(isOpen);

  return (
    <div className="cw-anchor" ref={ref}>
      <ToolbarButton title={title} isActive={isActive || isOpen} hasCaret onClick={() => setIsOpen((open) => !open)}>
        {icon}
      </ToolbarButton>
      {isOpen && (
        <div className={`cw-panel ${panelClass}${panelClassName}`} style={panelStyle} ref={panelRef} role="menu">
          {children(close)}
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  label: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  hint?: string;
}

const MenuItem = ({ label, onClick, isActive = false, isDisabled = false, hint }: MenuItemProps) => (
  <button
    type="button"
    role="menuitem"
    className={`cw-menu__item${isActive ? ' cw-menu__item--on' : ''}`}
    disabled={isDisabled}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    <span className="cw-menu__label">{label}</span>
    {hint && <span className="cw-menu__hint">{hint}</span>}
    <span className="cw-menu__check" aria-hidden="true">
      {isActive && <CheckIcon />}
    </span>
  </button>
);

const LinkControl = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [href, setHref] = useState('');
  const close = useCallback(() => setIsOpen(false), []);
  const ref = useDismiss(close);
  const inputRef = useRef<HTMLInputElement>(null);
  const { panelRef, panelClassName, panelStyle } = usePanelPosition(isOpen);
  const isActive = editor.isActive('link');
  const hasSelection = !editor.state.selection.empty || isActive;

  useEffect(() => {
    if (isOpen) focusWithoutScroll(inputRef.current);
  }, [isOpen]);

  const open = () => {
    setHref(editor.getAttributes('link').href || '');
    setIsOpen(true);
  };

  const save = () => {
    const value = withDefaultProtocol(href);

    if (!value) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange('link').setLink({ href: value }).run();

    close();
  };

  const remove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    close();
  };

  return (
    <div className="cw-anchor" ref={ref}>
      <ToolbarButton title="Link (Ctrl+K)" isActive={isActive || isOpen} onClick={() => (isOpen ? close() : open())}>
        <LinkIcon />
      </ToolbarButton>
      {isOpen && (
        <div className={`cw-panel cw-panel--form ck-responsive-form${panelClassName}`} style={panelStyle} ref={panelRef}>
          <span className="cw-panel__title">{isActive ? 'Edit link' : 'Add link'}</span>
          <div className="cw-field">
            <input
              ref={inputRef}
              className="cw-input"
              type="url"
              inputMode="url"
              value={href}
              placeholder="https://example.com"
              aria-label="Link URL"
              onChange={(event) => setHref(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  save();
                }
              }}
            />
            {isActive && (
              <button type="button" className="cw-icon-btn" title="Remove link" aria-label="Remove link" onMouseDown={(e) => e.preventDefault()} onClick={remove}>
                <UnlinkIcon />
              </button>
            )}
          </div>
          <div className="cw-panel__actions">
            <button type="button" className="cw-button cw-button--ghost" onMouseDown={(e) => e.preventDefault()} onClick={close}>
              Cancel
            </button>
            <button type="button" className="cw-button cw-button--primary" disabled={!href.trim()} onMouseDown={(e) => e.preventDefault()} onClick={save}>
              Save
            </button>
          </div>
          {!hasSelection && <span className="cw-panel__note">The URL is inserted as the link text.</span>}
        </div>
      )}
    </div>
  );
};

const ImageInsertControl = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = useState('');
  // Stable ref callback: fires when the panel mounts, not on every keystroke.
  const focusOnMount = useCallback((node: HTMLInputElement | null) => focusWithoutScroll(node), []);

  return (
    <ToolbarDropdown title="Insert image via URL" icon={<ImageInsertIcon />} panelClass="cw-panel--form">
      {(close) => {
        const insert = () => {
          if (url.trim()) editor.chain().focus().insertImageByUrl(withDefaultProtocol(url.trim())).run();
          setUrl('');
          close();
        };

        return (
          <>
            <span className="cw-panel__title">Image URL</span>
            <div className="cw-field">
              <input
                ref={focusOnMount}
                className="cw-input"
                type="url"
                inputMode="url"
                value={url}
                placeholder="https://example.com/photo.png"
                aria-label="Image URL"
                onChange={(event) => setUrl(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    insert();
                  }
                }}
              />
            </div>
            <div className="cw-panel__actions">
              <button type="button" className="cw-button cw-button--ghost" onMouseDown={(e) => e.preventDefault()} onClick={close}>
                Cancel
              </button>
              <button type="button" className="cw-button cw-button--primary" disabled={!url.trim()} onMouseDown={(e) => e.preventDefault()} onClick={insert}>
                Insert
              </button>
            </div>
          </>
        );
      }}
    </ToolbarDropdown>
  );
};

export interface ToolbarProps {
  editor: Editor;
  items: string[];
  config: EditorConfig;
}

/**
 * Renders the toolbar from the CKEditor item names the app already passes in
 * `CKEDITOR_CONFIG.toolbar`, so `excludeToolbar` keeps working unchanged. Names
 * are matched case-insensitively because the app's list uses `fontsize` where
 * CKEditor registered `fontSize`.
 */
export const Toolbar = ({ editor, items, config }: ToolbarProps) => {
  // The editor does not re-render React on every transaction, but the button
  // states (active marks, selected image, undo depth) have to follow it.
  const [, setRevision] = useState(0);

  useEffect(() => {
    const bump = () => setRevision((revision) => revision + 1);

    editor.on('transaction', bump);
    editor.on('selectionUpdate', bump);

    return () => {
      editor.off('transaction', bump);
      editor.off('selectionUpdate', bump);
    };
  }, [editor]);

  const isImageSelected = editor.isActive('ckImageBlock') || editor.isActive('ckImageInline');
  const resizeOptions = config.image?.resizeOptions?.length ? config.image.resizeOptions : DEFAULT_RESIZE_OPTIONS;
  const allowedImageStyles = config.image?.styles || ['alignLeft', 'alignRight'];
  const currentImageWidth = editor.getAttributes(isImageSelected && editor.isActive('ckImageInline') ? 'ckImageInline' : 'ckImageBlock').width || null;

  const registry: Record<string, () => ReactNode> = {
    bold: () => (
      <ToolbarButton key="bold" title="Bold (Ctrl+B)" isActive={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <BoldIcon />
      </ToolbarButton>
    ),

    italic: () => (
      <ToolbarButton key="italic" title="Italic (Ctrl+I)" isActive={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <ItalicIcon />
      </ToolbarButton>
    ),

    underline: () => (
      <ToolbarButton
        key="underline"
        title="Underline (Ctrl+U)"
        isActive={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </ToolbarButton>
    ),

    fontsize: () => (
      <ToolbarDropdown key="fontsize" title="Font size" icon={<FontSizeIcon />} isActive={editor.isActive('fontSize')} panelClass="cw-panel--menu">
        {(close) => (
          <div className="cw-menu">
            {FONT_SIZE_PRESETS.map((preset) => (
              <MenuItem
                key={preset.name}
                label={<span style={{ fontSize: `${Math.min(preset.px, 18)}px` }}>{preset.label}</span>}
                isActive={preset.className ? editor.isActive('fontSize', { class: preset.className }) : !editor.isActive('fontSize')}
                onClick={() => {
                  editor.chain().focus().setFontSize(preset.name).run();
                  close();
                }}
              />
            ))}
          </div>
        )}
      </ToolbarDropdown>
    ),

    highlight: () => (
      <ToolbarDropdown key="highlight" title="Highlight" icon={<HighlightIcon />} isActive={editor.isActive('highlight')} panelClass="cw-panel--swatches">
        {(close) => (
          <>
            <span className="cw-panel__title">Highlight</span>
            <div className="cw-swatches">
              {HIGHLIGHT_OPTIONS.map((option) => (
                <button
                  key={option.model}
                  type="button"
                  className={`cw-swatch${editor.isActive('highlight', { class: option.className }) ? ' cw-swatch--on' : ''}`}
                  title={option.title}
                  aria-label={option.title}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    editor.chain().focus().toggleHighlight(option.className).run();
                    close();
                  }}
                >
                  <span
                    className="cw-swatch__chip"
                    style={option.type === 'pen' ? { color: option.color, boxShadow: `inset 0 0 0 2px ${option.color}` } : { background: option.color }}
                  >
                    A
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="cw-menu__item cw-menu__item--danger"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                editor.chain().focus().unsetHighlight().run();
                close();
              }}
            >
              <span className="cw-menu__icon">
                <TrashIcon />
              </span>
              <span className="cw-menu__label">Remove highlight</span>
            </button>
          </>
        )}
      </ToolbarDropdown>
    ),

    bulletedlist: () => (
      <ToolbarButton
        key="bulletedList"
        title="Bulleted list"
        isActive={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <BulletedListIcon />
      </ToolbarButton>
    ),

    numberedlist: () => (
      <ToolbarButton
        key="numberedList"
        title="Numbered list"
        isActive={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <NumberedListIcon />
      </ToolbarButton>
    ),

    outdent: () => (
      <ToolbarButton key="outdent" title="Decrease indent" onClick={() => editor.chain().focus().outdentBlock().run()}>
        <OutdentIcon />
      </ToolbarButton>
    ),

    indent: () => (
      <ToolbarButton key="indent" title="Increase indent" onClick={() => editor.chain().focus().indentBlock().run()}>
        <IndentIcon />
      </ToolbarButton>
    ),

    link: () => <LinkControl key="link" editor={editor} />,

    blockquote: () => (
      <ToolbarButton
        key="blockQuote"
        title="Block quote"
        isActive={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <BlockQuoteIcon />
      </ToolbarButton>
    ),

    removeformat: () => (
      <ToolbarButton key="removeFormat" title="Remove format" onClick={() => editor.chain().focus().removeFormat().run()}>
        <RemoveFormatIcon />
      </ToolbarButton>
    ),

    imageupload: () => (
      <ToolbarButton key="imageUpload" title="Insert image" onClick={() => editor.chain().focus().openImageFilePicker().run()}>
        <ImageUploadIcon />
      </ToolbarButton>
    ),

    imageinsert: () => <ImageInsertControl key="imageInsert" editor={editor} />,

    'imagestyle:alignleft': () =>
      allowedImageStyles.includes('alignLeft') ? (
        <ToolbarButton
          key="imageStyle:alignLeft"
          title="Left aligned image"
          isDisabled={!isImageSelected}
          isActive={editor.isActive('ckImageBlock', { imageStyle: 'alignLeft' })}
          onClick={() => editor.chain().focus().setImageStyle('alignLeft').run()}
        >
          <AlignLeftIcon />
        </ToolbarButton>
      ) : null,

    'imagestyle:alignright': () =>
      allowedImageStyles.includes('alignRight') ? (
        <ToolbarButton
          key="imageStyle:alignRight"
          title="Right aligned image"
          isDisabled={!isImageSelected}
          isActive={editor.isActive('ckImageBlock', { imageStyle: 'alignRight' })}
          onClick={() => editor.chain().focus().setImageStyle('alignRight').run()}
        >
          <AlignRightIcon />
        </ToolbarButton>
      ) : null,

    imageresize: () => (
      <ToolbarDropdown key="imageResize" title="Resize image" icon={<ImageResizeIcon />} panelClass="cw-panel--menu">
        {(close) => (
          <div className="cw-menu">
            {!isImageSelected && <span className="cw-menu__empty">Select an image first</span>}
            {resizeOptions.map((option) => (
              <MenuItem
                key={option.name}
                label={option.label}
                isDisabled={!isImageSelected}
                isActive={isImageSelected && (option.value === null ? !currentImageWidth : currentImageWidth === `${option.value}px`)}
                onClick={() => {
                  editor.chain().focus().setImageWidth(option.value).run();
                  close();
                }}
              />
            ))}
          </div>
        )}
      </ToolbarDropdown>
    ),

    specialcharacters: () => (
      <ToolbarDropdown key="specialCharacters" title="Special characters" icon={<SpecialCharactersIcon />} panelClass="cw-panel--characters">
        {(close) => (
          <div className="cw-characters">
            {SPECIAL_CHARACTER_GROUPS.map((group) => (
              <div key={group.label} className="cw-characters__group">
                <span className="cw-panel__title">{group.label}</span>
                <div className="cw-characters__grid">
                  {group.characters.map(({ character, title }) => (
                    <button
                      key={`${group.label}-${character}`}
                      type="button"
                      className="cw-character"
                      title={title}
                      aria-label={title}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        editor.chain().focus().insertContent(character).run();
                        close();
                      }}
                    >
                      {character}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ToolbarDropdown>
    ),

    undo: () => (
      <ToolbarButton key="undo" title="Undo (Ctrl+Z)" isDisabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <UndoIcon />
      </ToolbarButton>
    ),

    redo: () => (
      <ToolbarButton key="redo" title="Redo (Ctrl+Y)" isDisabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <RedoIcon />
      </ToolbarButton>
    )
  };

  // Consecutive items of the same kind form one group; '|' forces a break.
  const groups = useMemo(() => {
    const built: { key: string; names: string[] }[] = [];

    items.forEach((item) => {
      const name = item.toLowerCase();
      if (name === '|') {
        built.push({ key: `break-${built.length}`, names: [] });

        return;
      }

      if (!registry[name]) return;

      const groupName = ITEM_GROUP[name] || name;
      const last = built[built.length - 1];

      if (last && last.key.startsWith(`${groupName}-`)) last.names.push(name);
      else built.push({ key: `${groupName}-${built.length}`, names: [name] });
    });

    return built.filter((group) => group.names.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.join('|')]);

  const toolbarRef = useRef<HTMLDivElement>(null);
  const groupWidths = useRef<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(groups.length);

  // Responsive layout: groups that no longer fit move into the overflow menu, so
  // the toolbar stays one clean row instead of wrapping into ragged rows.
  useLayoutEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;

    const measure = () => {
      const rendered = Array.from(toolbar.querySelectorAll<HTMLElement>('[data-group]'));
      // Widths are only trustworthy while everything is on screen; cache them the
      // first time and reuse, since the buttons are fixed-size icons.
      rendered.forEach((element) => {
        const index = Number(element.dataset.groupIndex);
        if (!groupWidths.current[index]) groupWidths.current[index] = element.offsetWidth;
      });

      const available = toolbar.clientWidth - 8;

      // No layout to measure against (a hidden editor, or a test environment):
      // keep every group rather than collapsing everything into the menu.
      if (available <= 0) {
        setVisibleCount(groups.length);

        return;
      }

      const overflowButton = 40;
      let used = 0;
      let fits = 0;

      for (let index = 0; index < groups.length; index += 1) {
        const width = groupWidths.current[index] || 0;
        const isLast = index === groups.length - 1;
        const budget = isLast ? available : available - overflowButton;

        if (used + width > budget) break;

        used += width;
        fits += 1;
      }

      setVisibleCount(Math.max(1, fits));
    };

    measure();

    if (!window.ResizeObserver) return;

    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);

    return () => observer.disconnect();
  }, [groups]);

  const renderGroup = (group: { key: string; names: string[] }, index: number) => (
    <div className="cw-toolbar__group" key={group.key} data-group={group.key} data-group-index={index}>
      {group.names.map((name) => registry[name]())}
    </div>
  );

  const visible = groups.slice(0, visibleCount);
  const overflow = groups.slice(visibleCount);

  return (
    <div className="cw-toolbar" role="toolbar" aria-label="Text formatting" ref={toolbarRef}>
      {visible.map(renderGroup)}
      {overflow.length > 0 && (
        <div className="cw-toolbar__overflow">
          <ToolbarDropdown title="More options" icon={<MoreIcon />} panelClass="cw-panel--overflow">
            {() => <div className="cw-toolbar cw-toolbar--stacked">{overflow.map(renderGroup)}</div>}
          </ToolbarDropdown>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
