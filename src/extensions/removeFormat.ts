import { Extension } from '@tiptap/core';

/**
 * CKEditor's RemoveFormat: clears the formatting marks and the block indent, and
 * deliberately leaves links, mentions and images alone.
 */
export const FORMATTING_MARKS = ['bold', 'italic', 'underline', 'strike', 'code', 'fontSize', 'highlight'];

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    removeFormat: {
      removeFormat: () => ReturnType;
    };
  }
}

export const RemoveFormat = Extension.create({
  name: 'removeFormat',

  addCommands() {
    return {
      removeFormat:
        () =>
        ({ chain, editor }) => {
          const availableMarks = FORMATTING_MARKS.filter((name) => Boolean(editor.schema.marks[name]));
          const withoutMarks = availableMarks.reduce(
            (commandChain, name) => commandChain.unsetMark(name, { extendEmptyMarkRange: true }),
            chain()
          );

          // Indentation is a formatting attribute in CKEditor too, so it goes as
          // well. Everything stays in one chain: a nested dispatch would build a
          // transaction against an already-updated state.
          const canUnsetIndent = typeof (withoutMarks as Record<string, unknown>).unsetBlockIndent === 'function';

          return (canUnsetIndent ? withoutMarks.unsetBlockIndent() : withoutMarks).run();
        }
    };
  }
});

export default RemoveFormat;
