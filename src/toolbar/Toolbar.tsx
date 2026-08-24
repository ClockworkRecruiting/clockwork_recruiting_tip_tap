import { useEffect, useRef, useState, type ReactNode } from 'react';
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
  FontSizeIcon,
  HighlightIcon,
  ImageInsertIcon,
  ImageResizeIcon,
  ImageUploadIcon,
  IndentIcon,
  ItalicIcon,
  LinkIcon,
  NumberedListIcon,
  OutdentIcon,
  RedoIcon,
  RemoveFormatIcon,
  SpecialCharactersIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon
} from './icons';

const DEFAULT_RESIZE_OPTIONS: ImageResizeOption[] = [
  { name: 'resizeImage:original', label: 'Original', value: null },
  { name: 'resizeImage:150', label: '150px', value: '150' },
  { name: 'resizeImage:250', label: '250px', value: '250' }
];

interface ButtonProps {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
}

const ToolbarButton = ({ title, onClick, isActive = false, isDisabled = false, children }: ButtonProps) => (
  <button
    type="button"
    className={`cw-toolbar__button${isActive ? ' cw-toolbar__button--on' : ''}`}
    title={title}
    aria-label={title}
    aria-pressed={isActive}
    disabled={isDisabled}
    // Keep the document selection while the button is pressed.
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    {children}
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

interface DropdownProps {
  title: string;
  icon: ReactNode;
  isActive?: boolean;
  children: (close: () => void) => ReactNode;
}

const ToolbarDropdown = ({ title, icon, isActive = false, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const ref = useDismiss(close);

  return (
    <div className="cw-toolbar__dropdown" ref={ref}>
      <ToolbarButton title={title} isActive={isActive || isOpen} onClick={() => setIsOpen((open) => !open)}>
        {icon}
        <span className="cw-toolbar__caret" aria-hidden="true" />
      </ToolbarButton>
      {isOpen && <div className="cw-toolbar__panel">{children(close)}</div>}
    </div>
  );
};

const LinkControl = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [href, setHref] = useState('');
  const close = () => setIsOpen(false);
  const ref = useDismiss(close);
  const isActive = editor.isActive('link');

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

  return (
    <div className="cw-toolbar__dropdown" ref={ref}>
      <ToolbarButton title="Link (Ctrl+K)" isActive={isActive || isOpen} onClick={() => (isOpen ? close() : open())}>
        <LinkIcon />
      </ToolbarButton>
      {isOpen && (
        <div className="cw-toolbar__panel cw-toolbar__panel--form ck-responsive-form">
          <input
            className="cw-toolbar__input"
            type="text"
            value={href}
            placeholder="https://"
            autoFocus
            onChange={(event) => setHref(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                save();
              }
            }}
          />
          <button type="button" className="cw-toolbar__action" onClick={save}>
            Save
          </button>
          {isActive && (
            <button
              type="button"
              className="cw-toolbar__action cw-toolbar__action--secondary"
              title="Unlink"
              onClick={() => {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                close();
              }}
            >
              <UnlinkIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ImageInsertControl = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = useState('');

  return (
    <ToolbarDropdown title="Insert image via URL" icon={<ImageInsertIcon />}>
      {(close) => (
        <div className="cw-toolbar__panel--form ck-responsive-form">
          <input
            className="cw-toolbar__input"
            type="text"
            value={url}
            placeholder="https://"
            autoFocus
            onChange={(event) => setUrl(event.target.value)}
          />
          <button
            type="button"
            className="cw-toolbar__action"
            onClick={() => {
              if (url.trim()) editor.chain().focus().insertImageByUrl(withDefaultProtocol(url.trim())).run();
              setUrl('');
              close();
            }}
          >
            Insert
          </button>
        </div>
      )}
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
      <ToolbarDropdown key="fontsize" title="Font size" icon={<FontSizeIcon />} isActive={editor.isActive('fontSize')}>
        {(close) => (
          <ul className="cw-toolbar__list">
            {FONT_SIZE_PRESETS.map((preset) => (
              <li key={preset.name}>
                <button
                  type="button"
                  className={`cw-toolbar__option${editor.isActive('fontSize', preset.className ? { class: preset.className } : {}) ? ' cw-toolbar__option--on' : ''}`}
                  style={{ fontSize: `${preset.px}px` }}
                  onClick={() => {
                    editor.chain().focus().setFontSize(preset.name).run();
                    close();
                  }}
                >
                  {preset.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </ToolbarDropdown>
    ),

    highlight: () => (
      <ToolbarDropdown key="highlight" title="Highlight" icon={<HighlightIcon />} isActive={editor.isActive('highlight')}>
        {(close) => (
          <ul className="cw-toolbar__list cw-toolbar__list--swatches">
            {HIGHLIGHT_OPTIONS.map((option) => (
              <li key={option.model}>
                <button
                  type="button"
                  className="cw-toolbar__swatch"
                  title={option.title}
                  onClick={() => {
                    editor.chain().focus().toggleHighlight(option.className).run();
                    close();
                  }}
                >
                  <span
                    className="cw-toolbar__swatch-preview"
                    style={option.type === 'pen' ? { color: option.color, borderColor: option.color } : { backgroundColor: option.color }}
                  >
                    A
                  </span>
                  {option.title}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="cw-toolbar__option"
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  close();
                }}
              >
                Remove highlight
              </button>
            </li>
          </ul>
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
      <ToolbarDropdown key="imageResize" title="Resize image" icon={<ImageResizeIcon />}>
        {(close) => (
          <ul className="cw-toolbar__list">
            {resizeOptions.map((option) => (
              <li key={option.name}>
                <button
                  type="button"
                  className="cw-toolbar__option"
                  disabled={!isImageSelected}
                  onClick={() => {
                    editor.chain().focus().setImageWidth(option.value).run();
                    close();
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </ToolbarDropdown>
    ),

    specialcharacters: () => (
      <ToolbarDropdown key="specialCharacters" title="Special characters" icon={<SpecialCharactersIcon />}>
        {(close) => (
          <div className="cw-toolbar__characters">
            {SPECIAL_CHARACTER_GROUPS.map((group) => (
              <div key={group.label} className="cw-toolbar__character-group">
                <span className="cw-toolbar__character-label">{group.label}</span>
                <div className="cw-toolbar__character-grid">
                  {group.characters.map(({ character, title }) => (
                    <button
                      key={`${group.label}-${character}`}
                      type="button"
                      className="cw-toolbar__character"
                      title={title}
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
    ),

    '|': () => <span key="separator" className="cw-toolbar__separator" aria-hidden="true" />
  };

  return (
    <div className="cw-toolbar" role="toolbar" data-should-wrap={config.shouldNotGroupWhenFull !== false}>
      {items.map((item, index) => {
        const factory = registry[item.toLowerCase()];
        if (!factory) return null;

        const rendered = factory();

        return rendered ? <span key={`${item}-${index}`} className="cw-toolbar__slot">{rendered}</span> : null;
      })}
    </div>
  );
};

export default Toolbar;
