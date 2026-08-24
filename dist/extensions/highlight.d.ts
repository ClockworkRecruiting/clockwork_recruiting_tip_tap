import { Mark } from '@tiptap/core';
/**
 * CKEditor's Highlight feature: `<mark class="marker-yellow">`. The class list is
 * the CKEditor default set, which is also the set `_variables.scss` styles.
 */
export declare const HIGHLIGHT_OPTIONS: readonly [{
    readonly model: "yellowMarker";
    readonly className: "marker-yellow";
    readonly title: "Yellow marker";
    readonly color: "var(--cw-highlight-yellow, #fdfd77)";
    readonly type: "marker";
}, {
    readonly model: "greenMarker";
    readonly className: "marker-green";
    readonly title: "Green marker";
    readonly color: "var(--cw-highlight-green, #62f962)";
    readonly type: "marker";
}, {
    readonly model: "pinkMarker";
    readonly className: "marker-pink";
    readonly title: "Pink marker";
    readonly color: "var(--cw-highlight-pink, #fc7899)";
    readonly type: "marker";
}, {
    readonly model: "blueMarker";
    readonly className: "marker-blue";
    readonly title: "Blue marker";
    readonly color: "var(--cw-highlight-blue, #72cdfd)";
    readonly type: "marker";
}, {
    readonly model: "redPen";
    readonly className: "pen-red";
    readonly title: "Red pen";
    readonly color: "var(--cw-highlight-pen-red, #e91313)";
    readonly type: "pen";
}, {
    readonly model: "greenPen";
    readonly className: "pen-green";
    readonly title: "Green pen";
    readonly color: "var(--cw-highlight-pen-green, #118800)";
    readonly type: "pen";
}];
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        highlight: {
            setHighlight: (className: string) => ReturnType;
            toggleHighlight: (className: string) => ReturnType;
            unsetHighlight: () => ReturnType;
        };
    }
}
export declare const Highlight: Mark<any, any>;
export default Highlight;
