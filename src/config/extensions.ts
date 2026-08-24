import type { Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { Typography } from '@tiptap/extension-typography';
import { Heading } from '@tiptap/extension-heading';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';

import type { EditorConfig, UploadHandler } from '../types';
import { FontSize } from '../extensions/fontSize';
import { Highlight } from '../extensions/highlight';
import { Indent } from '../extensions/indent';
import { RemoveFormat } from '../extensions/removeFormat';
import { CkLink } from '../extensions/link';
import { CkImageBlock, CkImageInline, ImageUpload, DEFAULT_UPLOAD_TYPES } from '../extensions/image';
import { MentionMark, MentionSuggest } from '../extensions/mention';
import { PasteFromOffice } from '../extensions/pasteOffice';
import { SubmitOnCtrlEnter } from '../extensions/submitOnCtrlEnter';

/**
 * CKEditor's TextTransformation groups map onto Typography's individual rules.
 * `typing.transformations.remove` in the app config disables the fractions.
 */
const CK_TRANSFORMATION_TO_TYPOGRAPHY: Record<string, string[]> = {
  oneHalf: ['oneHalf'],
  oneForth: ['oneQuarter'],
  oneQuarter: ['oneQuarter'],
  threeQuarters: ['threeQuarters'],
  oneThird: [],
  twoThirds: [],
  ellipsis: ['ellipsis'],
  horizontalEllipsis: ['ellipsis'],
  enDash: ['emDash'],
  emDash: ['emDash'],
  quotesPrimary: ['openDoubleQuote', 'closeDoubleQuote'],
  quotesSecondary: ['openSingleQuote', 'closeSingleQuote'],
  arrowLeft: ['leftArrow'],
  arrowRight: ['rightArrow'],
  notEqual: ['notEqual'],
  copyright: ['copyright'],
  trademark: ['trademark'],
  registeredTrademark: ['registeredTrademark']
};

/** Rules Typography ships that CKEditor's default transformations did not apply. */
const TYPOGRAPHY_RULES_NOT_IN_CKEDITOR = ['laquo', 'raquo', 'multiplication', 'superscriptTwo', 'superscriptThree', 'servicemark', 'plusMinus'];

const typographyOptions = (config: EditorConfig): Record<string, false> => {
  const disabled: Record<string, false> = {};

  TYPOGRAPHY_RULES_NOT_IN_CKEDITOR.forEach((rule) => {
    disabled[rule] = false;
  });

  (config.typing?.transformations?.remove || []).forEach((name) => {
    (CK_TRANSFORMATION_TO_TYPOGRAPHY[name] || []).forEach((rule) => {
      disabled[rule] = false;
    });
  });

  return disabled;
};

export interface BuildExtensionsOptions {
  config: EditorConfig;
  upload?: UploadHandler | null;
  onSubmit?: (() => void) | null;
  placeholder?: string;
  onUploadError?: (message: string) => void;
}

/**
 * The extension set matching the CKEditor build one for one.
 *
 * Nodes and marks the CKEditor build did not include (headings, horizontal
 * rules) are parsed but have no input rule and no toolbar button: they exist so
 * that older notes containing them survive a round-trip instead of being
 * silently rewritten, without adding authoring behaviour CKEditor never had.
 */
export const buildExtensions = ({ config, upload = null, onSubmit = null, placeholder, onUploadError }: BuildExtensionsOptions): Extensions => {
  const uploadTypes = config.image?.upload?.types || DEFAULT_UPLOAD_TYPES;

  return [
    StarterKit.configure({
      // Replaced below with the CKEditor-compatible versions.
      link: false,
      heading: false,
      // Not part of the CKEditor build: keeping them out matches what the editor
      // accepts today (`~~`, backticks and code blocks stay literal text).
      strike: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      // CKEditor does not append an empty paragraph to every document, and the
      // stored HTML must not grow one on save.
      trailingNode: false,
      bulletList: { keepMarks: true, keepAttributes: false },
      orderedList: { keepMarks: true, keepAttributes: false }
    }),

    // Parse-only: no input rule, so typing "# " or "---" stays literal text as in
    // CKEditor. `#` in particular is a mention marker in this app.
    Heading.extend({ addInputRules: () => [] }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
    HorizontalRule.extend({ addInputRules: () => [] }),

    Typography.configure(typographyOptions(config)),

    FontSize,
    Highlight,
    Indent,
    RemoveFormat,

    CkLink.configure({
      defaultProtocol: config.link?.defaultProtocol || 'https://',
      addTargetToExternalLinks: config.link?.addTargetToExternalLinks !== false
    }),

    CkImageBlock.configure({ resizable: true, resizeUnit: config.image?.resizeUnit || 'px' }),
    CkImageInline,
    ImageUpload.configure({
      upload,
      allowedTypes: uploadTypes,
      ...(onUploadError ? { onError: onUploadError } : {})
    }),

    MentionMark,
    MentionSuggest.configure({ feeds: config.mention?.feeds || [] }),

    PasteFromOffice,
    SubmitOnCtrlEnter.configure({ onSubmit }),

    Placeholder.configure({ placeholder: placeholder || config.placeholder || '' })
  ];
};

export default buildExtensions;
