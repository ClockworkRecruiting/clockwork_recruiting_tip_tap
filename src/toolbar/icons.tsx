import type { ReactNode } from 'react';

const svg = (children: ReactNode) => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const glyph = (text: string, style: Record<string, string> = {}) => (
  <span className="cw-toolbar__glyph" style={style} aria-hidden="true">
    {text}
  </span>
);

export const BoldIcon = () => glyph('B', { fontWeight: '700' });
export const ItalicIcon = () => glyph('I', { fontStyle: 'italic', fontFamily: 'Georgia, serif' });
export const UnderlineIcon = () => glyph('U', { textDecoration: 'underline' });
export const FontSizeIcon = () => glyph('A', { fontWeight: '600' });

export const HighlightIcon = () =>
  svg(
    <>
      <path d="M4 13.2 11.4 5.8l2.8 2.8L6.8 16H4v-2.8Z" fill="currentColor" />
      <rect x="3" y="17" width="14" height="2" rx="1" fill="currentColor" />
    </>
  );

export const BulletedListIcon = () =>
  svg(
    <>
      {[5, 10, 15].map((y) => (
        <g key={y}>
          <circle cx="4" cy={y} r="1.4" fill="currentColor" />
          <rect x="7.5" y={y - 0.9} width="9" height="1.8" rx="0.9" fill="currentColor" />
        </g>
      ))}
    </>
  );

export const NumberedListIcon = () =>
  svg(
    <>
      {['1', '2', '3'].map((label, index) => (
        <g key={label}>
          <text x="2" y={index * 5 + 7} fontSize="5.5" fill="currentColor">
            {label}
          </text>
          <rect x="7.5" y={index * 5 + 4.1} width="9" height="1.8" rx="0.9" fill="currentColor" />
        </g>
      ))}
    </>
  );

const indentRows = (offsets: number[]) => (
  <>
    {offsets.map((offset, index) => (
      <rect key={index} x={offset} y={3 + index * 4} width={16 - offset} height="1.8" rx="0.9" fill="currentColor" />
    ))}
  </>
);

export const IndentIcon = () =>
  svg(
    <>
      {indentRows([2, 6, 6, 2])}
      <path d="M2 8.2 4.6 10 2 11.8Z" fill="currentColor" />
    </>
  );

export const OutdentIcon = () =>
  svg(
    <>
      {indentRows([2, 6, 6, 2])}
      <path d="M4.6 8.2 2 10l2.6 1.8Z" fill="currentColor" />
    </>
  );

export const LinkIcon = () =>
  svg(
    <path
      d="M8.2 11.8a3.4 3.4 0 0 1 0-4.8l2-2a3.4 3.4 0 0 1 4.8 4.8l-1 1-1.4-1.4 1-1a1.4 1.4 0 0 0-2-2l-2 2a1.4 1.4 0 0 0 0 2l-1.4 1.4Zm3.6-3.6a3.4 3.4 0 0 1 0 4.8l-2 2a3.4 3.4 0 0 1-4.8-4.8l1-1 1.4 1.4-1 1a1.4 1.4 0 0 0 2 2l2-2a1.4 1.4 0 0 0 0-2l1.4-1.4Z"
      fill="currentColor"
    />
  );

export const UnlinkIcon = () =>
  svg(
    <>
      <path d="M7 12.6 5.6 14a3.4 3.4 0 0 1-1-4.8l1-1L7 9.6l-1 1a1.4 1.4 0 0 0 1 2.1Z" fill="currentColor" />
      <path d="M13 7.4 14.4 6a3.4 3.4 0 0 1 1 4.8l-1 1L13 10.4l1-1a1.4 1.4 0 0 0-1-2.1Z" fill="currentColor" />
      <rect x="3" y="9.2" width="14" height="1.6" rx="0.8" transform="rotate(45 10 10)" fill="currentColor" />
    </>
  );

export const BlockQuoteIcon = () =>
  svg(
    <>
      <rect x="3" y="4" width="2.4" height="12" rx="1.2" fill="currentColor" />
      <rect x="7.5" y="5" width="9.5" height="1.8" rx="0.9" fill="currentColor" />
      <rect x="7.5" y="9.1" width="9.5" height="1.8" rx="0.9" fill="currentColor" />
      <rect x="7.5" y="13.2" width="6" height="1.8" rx="0.9" fill="currentColor" />
    </>
  );

export const RemoveFormatIcon = () =>
  svg(
    <>
      <text x="3" y="14" fontSize="11" fontWeight="700" fill="currentColor">
        A
      </text>
      <path d="M11 5.6 16.4 11l-1.4 1.4L9.6 7l1.4-1.4Z" fill="currentColor" />
      <path d="M16.4 5.6 11 11 9.6 9.6 15 4.2l1.4 1.4Z" fill="currentColor" />
    </>
  );

export const ImageUploadIcon = () =>
  svg(
    <>
      <path d="M3 4h14v9H3V4Zm1.6 7.4h10.8l-3.2-4-2.6 3.2-1.6-1.8-3.4 2.6Z" fill="currentColor" />
      <rect x="3" y="15" width="14" height="1.8" rx="0.9" fill="currentColor" />
    </>
  );

export const ImageInsertIcon = () =>
  svg(
    <>
      <path d="M3 4h14v9H3V4Zm1.6 7.4h10.8l-3.2-4-2.6 3.2-1.6-1.8-3.4 2.6Z" fill="currentColor" />
      <path d="M13.4 14h1.8v2h2v1.8h-2v2h-1.8v-2h-2V16h2v-2Z" fill="currentColor" />
    </>
  );

export const AlignLeftIcon = () =>
  svg(
    <>
      <rect x="3" y="4" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="11" y="4.4" width="6" height="1.6" rx="0.8" fill="currentColor" />
      <rect x="11" y="8" width="6" height="1.6" rx="0.8" fill="currentColor" />
      <rect x="3" y="13" width="14" height="1.6" rx="0.8" fill="currentColor" />
    </>
  );

export const AlignRightIcon = () =>
  svg(
    <>
      <rect x="10" y="4" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="3" y="4.4" width="6" height="1.6" rx="0.8" fill="currentColor" />
      <rect x="3" y="8" width="6" height="1.6" rx="0.8" fill="currentColor" />
      <rect x="3" y="13" width="14" height="1.6" rx="0.8" fill="currentColor" />
    </>
  );

export const ImageResizeIcon = () =>
  svg(
    <>
      <rect x="3" y="4" width="14" height="12" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 14h5V9l-5 5Z" fill="currentColor" />
    </>
  );

export const SpecialCharactersIcon = () => glyph('Ω');

export const UndoIcon = () =>
  svg(
    <path
      d="M8 6V3.4L3.6 7.2 8 11V8.2c2.6 0 4.6 1.6 4.6 4.1 0 .9-.2 1.7-.6 2.4l1.6.9c.6-1 .9-2.1.9-3.3 0-3.6-2.9-6.3-6.5-6.3Z"
      fill="currentColor"
    />
  );

export const RedoIcon = () =>
  svg(
    <g transform="translate(20 0) scale(-1 1)">
      <path
        d="M8 6V3.4L3.6 7.2 8 11V8.2c2.6 0 4.6 1.6 4.6 4.1 0 .9-.2 1.7-.6 2.4l1.6.9c.6-1 .9-2.1.9-3.3 0-3.6-2.9-6.3-6.5-6.3Z"
        fill="currentColor"
      />
    </g>
  );

export const CheckIcon = () =>
  svg(<path d="M7.6 13.4 4.2 10l-1.4 1.4 4.8 4.8L17.2 6.6 15.8 5.2l-8.2 8.2Z" fill="currentColor" />);

export const MoreIcon = () =>
  svg(
    <>
      {[5, 10, 15].map((x) => (
        <circle key={x} cx={x} cy="10" r="1.7" fill="currentColor" />
      ))}
    </>
  );

export const TrashIcon = () =>
  svg(
    <>
      <path d="M5.5 6.5h9l-.8 10a1.2 1.2 0 0 1-1.2 1.1H7.5a1.2 1.2 0 0 1-1.2-1.1l-.8-10Z" fill="currentColor" />
      <path d="M8 4.2c0-.6.5-1.1 1.1-1.1h1.8c.6 0 1.1.5 1.1 1.1v.6H8v-.6ZM3.8 5h12.4v1.6H3.8V5Z" fill="currentColor" />
    </>
  );
