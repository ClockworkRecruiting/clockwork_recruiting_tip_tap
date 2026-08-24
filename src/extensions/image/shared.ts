export const IMAGE_STYLES = ['alignLeft', 'alignRight'] as const;
export type ImageStyleName = (typeof IMAGE_STYLES)[number];

export const RESIZED_CLASS = 'image_resized';
export const FIGURE_CLASS = 'image';

const STYLE_CLASS: Record<string, string> = {
  alignLeft: 'image-style-align-left',
  alignRight: 'image-style-align-right'
};

export const classNameForImageStyle = (style?: string | null): string | null => (style ? STYLE_CLASS[style] || null : null);

export const imageStyleFromClassList = (classList: DOMTokenList): ImageStyleName | null => {
  const found = IMAGE_STYLES.find((style) => classList.contains(STYLE_CLASS[style]));

  return found || null;
};

/** Normalises a width to the `150px` form CKEditor writes into the style attribute. */
export const normalizeWidth = (value?: string | number | null): string | null => {
  if (value === null || value === undefined || value === '' || value === 'unset') return null;

  const raw = String(value).trim();
  if (!raw) return null;
  if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`;
  if (/^\d+(\.\d+)?(px|%)$/.test(raw)) return raw;

  return null;
};

export const widthFromElement = (figure: HTMLElement | null, img: HTMLElement | null): string | null => {
  const figureWidth = normalizeWidth(figure?.style.width);
  if (figureWidth) return figureWidth;

  const imgStyleWidth = normalizeWidth((img as HTMLElement | null)?.style.width);
  if (imgStyleWidth) return imgStyleWidth;

  return normalizeWidth(img?.getAttribute('width'));
};

export const figureClassName = (width: string | null, imageStyle: string | null, extra: string[] = []): string =>
  [FIGURE_CLASS, width ? RESIZED_CLASS : null, classNameForImageStyle(imageStyle), ...extra].filter(Boolean).join(' ');

export const widthStyle = (width: string | null): string | null => (width ? `width:${width};` : null);
