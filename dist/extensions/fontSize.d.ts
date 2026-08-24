import { Mark } from '@tiptap/core';
/**
 * CKEditor's FontSize feature with named presets, which is what the notes in the
 * database were written with: a `<span>` carrying one of four classes. The px
 * values below are the ones `_variables.scss` renders those classes at, and are
 * used only to map legacy inline `font-size` styles onto the scale.
 */
export declare const FONT_SIZE_PRESETS: readonly [{
    readonly name: "tiny";
    readonly className: "text-tiny";
    readonly px: 9.1;
    readonly label: "Tiny";
}, {
    readonly name: "small";
    readonly className: "text-small";
    readonly px: 11.05;
    readonly label: "Small";
}, {
    readonly name: "default";
    readonly className: null;
    readonly px: 13;
    readonly label: "Default";
}, {
    readonly name: "big";
    readonly className: "text-big";
    readonly px: 18.2;
    readonly label: "Big";
}, {
    readonly name: "huge";
    readonly className: "text-huge";
    readonly px: 23.4;
    readonly label: "Huge";
}];
export type FontSizeName = (typeof FONT_SIZE_PRESETS)[number]['name'];
/** Nearest preset for a legacy inline size, or `null` for the default size. */
export declare const fontSizeClassForPx: (px: number) => string | null;
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (name: FontSizeName) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}
export declare const FontSize: Mark<any, any>;
export default FontSize;
