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
export declare const ClockworkEditor: import("react").ForwardRefExoticComponent<ClockworkEditorProps & import("react").RefAttributes<ClockworkEditorApi | null>>;
export default ClockworkEditor;
