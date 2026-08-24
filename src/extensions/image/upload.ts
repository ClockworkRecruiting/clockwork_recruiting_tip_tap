import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { UploadHandler } from '../../types';

export const DEFAULT_MAX_IMAGE_MB = 10;
export const DEFAULT_UPLOAD_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'bmp', 'webp'];

export interface ImageUploadOptions {
  upload: UploadHandler | null;
  allowedTypes: string[];
  maxSizeMb: number;
  onError: (message: string) => void;
}

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    imageUpload: {
      uploadImages: (files: File[] | FileList) => ReturnType;
      openImageFilePicker: () => ReturnType;
      insertImageByUrl: (url: string) => ReturnType;
    };
  }
}

const extensionOf = (name: string): string => (name.includes('.') ? name.split('.').pop()!.toLowerCase() : '');

const isAllowed = (file: File, allowedTypes: string[]): boolean => {
  if (!file.type.startsWith('image/')) return false;
  if (!allowedTypes.length) return true;

  const subtype = file.type.slice('image/'.length).toLowerCase();
  const extension = extensionOf(file.name);
  const normalized = allowedTypes.map((type) => type.toLowerCase());

  return normalized.includes(subtype) || (extension ? normalized.includes(extension) : false) || (subtype === 'jpeg' && normalized.includes('jpg'));
};

let uploadCounter = 0;
const nextUploadId = (): string => {
  uploadCounter += 1;

  return `cw-upload-${uploadCounter}-${Math.random().toString(36).slice(2, 8)}`;
};

const findNodeByUploadId = (editor: any, uploadId: string): { pos: number; attrs: Record<string, any> } | null => {
  let found: { pos: number; attrs: Record<string, any> } | null = null;

  editor.state.doc.descendants((node: any, pos: number) => {
    if (found) return false;
    if (node.attrs?.uploadId === uploadId) found = { pos, attrs: node.attrs };

    return true;
  });

  return found;
};

/**
 * Replaces the CKEditor upload adapter plumbing: the caller supplies an
 * `upload` handler (S3 presign + PUT in the Clockwork app) and this extension
 * owns the editor side, i.e. the placeholder, the progress bar and the swap to
 * the final URL.
 */
export const ImageUpload = Extension.create<ImageUploadOptions>({
  name: 'imageUpload',

  addOptions() {
    return {
      upload: null,
      allowedTypes: DEFAULT_UPLOAD_TYPES,
      maxSizeMb: DEFAULT_MAX_IMAGE_MB,
      // eslint-disable-next-line no-alert
      onError: (message: string) => window.alert(message)
    };
  },

  addCommands() {
    const startUpload = (file: File) => {
      const { editor } = this;
      const { upload, maxSizeMb, allowedTypes, onError } = this.options;

      if (!upload) {
        onError('Image upload is not configured for this editor.');

        return;
      }

      if (!isAllowed(file, allowedTypes)) {
        onError(`${file.name} is not a supported image type.`);

        return;
      }

      if (file.size / 1024 ** 2 > maxSizeMb) {
        onError(`Selected image size is greater than ${maxSizeMb}MB.`);

        return;
      }

      const uploadId = nextUploadId();
      const previewUrl = URL.createObjectURL(file);
      const controller = new AbortController();

      editor.commands.insertContent({
        type: 'ckImageBlock',
        attrs: { src: previewUrl, uploadId, uploading: true }
      });

      const setProgress = (ratio: number) => {
        const bar = editor.view.dom.querySelector<HTMLElement>(`figure[data-upload-id="${uploadId}"] .cw-image__progress`);
        if (bar) bar.style.width = `${Math.round(ratio * 100)}%`;
      };

      const finish = (attrs: Record<string, any> | null) => {
        const target = findNodeByUploadId(editor, uploadId);
        URL.revokeObjectURL(previewUrl);
        if (!target) return;

        const { tr } = editor.state;
        if (attrs) tr.setNodeMarkup(target.pos, undefined, { ...target.attrs, ...attrs, uploadId: null, uploading: false });
        else tr.delete(target.pos, target.pos + 1);

        editor.view.dispatch(tr);
      };

      upload(file, {
        signal: controller.signal,
        onProgress: ({ loaded, total }) => setProgress(total ? loaded / total : 0)
      })
        .then((result) => {
          const url = typeof result === 'string' ? result : result?.url;
          if (!url) throw new Error(`Couldn't upload file: ${file.name}.`);

          finish({ src: url });
        })
        .catch((error: Error) => {
          finish(null);
          onError(error?.message || `Couldn't upload file: ${file.name}.`);
        });
    };

    return {
      uploadImages:
        (files) =>
        () => {
          Array.from(files).forEach(startUpload);

          return true;
        },

      openImageFilePicker:
        () =>
        ({ commands }) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = this.options.allowedTypes.map((type) => `image/${type === 'jpg' ? 'jpeg' : type}`).join(',');
          input.multiple = true;
          input.style.display = 'none';
          input.addEventListener('change', () => {
            if (input.files?.length) commands.uploadImages(input.files);
            input.remove();
          });

          document.body.appendChild(input);
          input.click();

          return true;
        },

      insertImageByUrl:
        (url) =>
        ({ commands }) => {
          if (!url) return false;

          return commands.insertContent({ type: 'ckImageBlock', attrs: { src: url } });
        }
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    const imageFilesFrom = (list: FileList | null | undefined): File[] =>
      Array.from(list || []).filter((file) => file.type.startsWith('image/'));

    return [
      new Plugin({
        key: new PluginKey('cwImageUploadDropPaste'),
        props: {
          handlePaste: (_view, event) => {
            const files = imageFilesFrom(event.clipboardData?.files);
            if (!files.length) return false;

            event.preventDefault();
            editor.commands.uploadImages(files);

            return true;
          },

          handleDrop: (_view, event) => {
            const files = imageFilesFrom((event as DragEvent).dataTransfer?.files);
            if (!files.length) return false;

            event.preventDefault();
            editor.commands.uploadImages(files);

            return true;
          }
        }
      })
    ];
  }
});

export default ImageUpload;
