import { Extension } from '@tiptap/core';

/**
 * CKEditor's Indent + IndentBlock pair.
 *
 * On a list item the buttons change nesting (Indent), everywhere else they add
 * `margin-left` in 40px steps (IndentBlock with its default offset), which is
 * exactly what the stored notes contain.
 */
export const INDENT_STEP_PX = 40;
export const MAX_INDENT_STEPS = 10;

export interface IndentOptions {
  types: string[];
  stepPx: number;
  maxSteps: number;
}

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    indent: {
      indentBlock: () => ReturnType;
      outdentBlock: () => ReturnType;
      unsetBlockIndent: () => ReturnType;
    };
  }
}

const clamp = (value: number, max: number): number => Math.max(0, Math.min(value, max));

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      stepPx: INDENT_STEP_PX,
      maxSteps: MAX_INDENT_STEPS
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const marginLeft = (element as HTMLElement).style.marginLeft;
              if (!marginLeft || !marginLeft.endsWith('px')) return 0;

              return clamp(Math.round(parseFloat(marginLeft) / this.options.stepPx), this.options.maxSteps);
            },
            renderHTML: (attributes) => {
              const steps = Number(attributes.indent) || 0;
              if (steps <= 0) return {};

              return { style: `margin-left:${steps * this.options.stepPx}px;` };
            }
          }
        }
      }
    ];
  },

  addCommands() {
    const shift = (direction: 1 | -1) => () => ({ editor, commands, tr, state, dispatch }: any) => {
      // Lists keep CKEditor's behaviour: indenting nests, outdenting lifts.
      if (editor.isActive('listItem')) {
        return direction === 1 ? commands.sinkListItem('listItem') : commands.liftListItem('listItem');
      }

      const { from, to } = state.selection;
      let changed = false;

      state.doc.nodesBetween(from, to, (node: any, pos: number) => {
        if (!this.options.types.includes(node.type.name)) return;

        const current = Number(node.attrs.indent) || 0;
        const next = clamp(current + direction, this.options.maxSteps);
        if (next === current) return;

        tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next });
        changed = true;
      });

      if (changed && dispatch) dispatch(tr);

      return changed;
    };

    return {
      indentBlock: shift(1),
      outdentBlock: shift(-1),
      unsetBlockIndent:
        () =>
        ({ tr, state, dispatch }) => {
          const { from, to } = state.selection;
          let changed = false;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!this.options.types.includes(node.type.name) || !node.attrs.indent) return;

            tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: 0 });
            changed = true;
          });

          if (changed && dispatch) dispatch(tr);

          return changed;
        }
    };
  }
});

export default Indent;
