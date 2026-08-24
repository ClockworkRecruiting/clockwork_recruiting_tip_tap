import { Extension } from '@tiptap/core';

export interface SubmitOptions {
  onSubmit: (() => void) | null;
}

/**
 * The Ctrl+Enter handler the note forms bound manually on the CKEditor instance.
 */
export const SubmitOnCtrlEnter = Extension.create<SubmitOptions>({
  name: 'submitOnCtrlEnter',

  addOptions() {
    return { onSubmit: null };
  },

  addKeyboardShortcuts() {
    const submit = () => {
      const handler = this.options.onSubmit;
      if (typeof handler !== 'function') return false;

      handler();

      return true;
    };

    return { 'Mod-Enter': submit, 'Ctrl-Enter': submit };
  }
});

export default SubmitOnCtrlEnter;
