export declare const IMAGE_STYLES: readonly ["alignLeft", "alignRight"];
export type ImageStyleName = (typeof IMAGE_STYLES)[number];
export declare const RESIZED_CLASS = "image_resized";
export declare const FIGURE_CLASS = "image";
export declare const classNameForImageStyle: (style?: string | null) => string | null;
export declare const imageStyleFromClassList: (classList: DOMTokenList) => ImageStyleName | null;
/** Normalises a width to the `150px` form CKEditor writes into the style attribute. */
export declare const normalizeWidth: (value?: string | number | null) => string | null;
export declare const widthFromElement: (figure: HTMLElement | null, img: HTMLElement | null) => string | null;
export declare const figureClassName: (width: string | null, imageStyle: string | null, extra?: string[]) => string;
export declare const widthStyle: (width: string | null) => string | null;
