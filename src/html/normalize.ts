/**
 * Input normalisation: everything the editor loads goes through here, whether it
 * came from the database (CKEditor 5 output, and older CKEditor 4 output that
 * was never rewritten) or from the clipboard.
 */

const NBSP = '\u00A0';

/** `<p>&nbsp;</p>` is CKEditor's empty paragraph; keep it empty so it does not accumulate. */
const emptyNbspParagraphs = (root: ParentNode): void => {
  root.querySelectorAll('p').forEach((paragraph) => {
    if (paragraph.textContent === NBSP && paragraph.children.length === 0) paragraph.textContent = '';
  });
};

/** Image captions were removed from the CKEditor build; drop them as CKEditor did. */
const dropFigureCaptions = (root: ParentNode): void => {
  root.querySelectorAll('figcaption').forEach((caption) => caption.remove());
};

/** CKEditor 4 wrote `<span style="font-size:14px">`; map it onto the class-based scale. */
const inlineFontSizeToClass = (root: ParentNode, map: (px: number) => string | null): void => {
  root.querySelectorAll<HTMLElement>('[style*="font-size"]').forEach((element) => {
    const raw = element.style.fontSize;
    const px = raw.endsWith('px') ? parseFloat(raw) : null;
    element.style.removeProperty('font-size');

    const className = px === null ? null : map(px);
    if (className) element.classList.add(className);
  });
};

export interface NormalizeOptions {
  fontSizeClassForPx?: (px: number) => string | null;
}

export const normalizeIncomingHtml = (html: string, options: NormalizeOptions = {}, doc: Document = document): string => {
  if (!html) return '';

  const container = doc.createElement('div');
  container.innerHTML = html;

  emptyNbspParagraphs(container);
  dropFigureCaptions(container);
  if (options.fontSizeClassForPx) inlineFontSizeToClass(container, options.fontSizeClassForPx);

  return container.innerHTML;
};

export default normalizeIncomingHtml;
