import { Extension } from '@tiptap/core';
import type { UploadHandler } from '../../types';
export declare const DEFAULT_MAX_IMAGE_MB = 10;
export declare const DEFAULT_UPLOAD_TYPES: string[];
export interface ImageUploadOptions {
    upload: UploadHandler | null;
    allowedTypes: string[];
    maxSizeMb: number;
    onError: (message: string) => void;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageUpload: {
            uploadImages: (files: File[] | FileList) => ReturnType;
            openImageFilePicker: () => ReturnType;
            insertImageByUrl: (url: string) => ReturnType;
        };
    }
}
/**
 * Replaces the CKEditor upload adapter plumbing: the caller supplies an
 * `upload` handler (S3 presign + PUT in the Clockwork app) and this extension
 * owns the editor side, i.e. the placeholder, the progress bar and the swap to
 * the final URL.
 */
export declare const ImageUpload: Extension<ImageUploadOptions, any>;
export default ImageUpload;
