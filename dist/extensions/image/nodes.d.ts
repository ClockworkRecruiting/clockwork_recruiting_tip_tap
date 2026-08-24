import { Node } from '@tiptap/core';
import { type ImageStyleName } from './shared';
export interface CkImageOptions {
    /** Drag handles on block images, i.e. CKEditor's ImageResize. */
    resizable: boolean;
    resizeUnit: 'px' | '%';
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        ckImage: {
            setImage: (attributes: {
                src: string;
                alt?: string;
                width?: string | null;
            }) => ReturnType;
            setImageStyle: (style: ImageStyleName | null) => ReturnType;
            setImageWidth: (width: string | number | null) => ReturnType;
        };
    }
}
/** `<figure class="image"><img src=".."></figure>`, the shape CKEditor's ImageBlock writes. */
export declare const CkImageBlock: Node<CkImageOptions, any>;
/** `<p>text <img src=".."></p>`, CKEditor's ImageInline. */
export declare const CkImageInline: Node<any, any>;
