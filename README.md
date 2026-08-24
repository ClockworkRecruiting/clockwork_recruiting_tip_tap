# @clockwork/tiptap-editor

The Clockwork note editor, built on [Tiptap](https://tiptap.dev) (open source, MIT) as a
drop-in replacement for the `ckeditor5-custom-build` package.

Two things drove the design:

1. **Existing note HTML must not change.** Notes written over the years with CKEditor 5
   (and some with CKEditor 4 before that) are stored as raw HTML. Opening one in this
   editor and saving it again produces the same markup, down to class names and the
   `width:150px` spacing inside style attributes. There is no content migration.
2. **Call sites must not change.** The component accepts the same `CKEDITOR_CONFIG`
   object, the same toolbar item names, the same `excludeToolbar` list, and the same
   mention feed contract the app's `useMentions` hook already produces.

## Install

The core app consumes this the same way it consumed the CKEditor build: a GitHub URL
pinned to a commit.

```json
"@clockwork/tiptap-editor": "https://github.com/ClockworkRecruiting/clockwork-tiptap-editor.git#<commit-sha>"
```

`dist/` is committed, so `yarn install` needs no build step. `prepare` also rebuilds it
if the consumer installs from a working copy.

## Usage

```jsx
import { ClockworkEditor } from '@clockwork/tiptap-editor';
import '@clockwork/tiptap-editor/style.css';

<ClockworkEditor
  id="note-editor"
  content={note.body}
  onChange={setBody}
  config={{ ...CKEDITOR_CONFIG, ...mentionConfig }}
  excludeToolbar={['highlight']}
  placeholder="Write a note"
  height={300}
  resizable
  upload={uploadImageToS3}
  onReturn={submit}
  onReady={(api) => setEditorApi(api)}
/>;
```

`onReady` hands back a small API that mirrors the CKEditor instance methods the wrappers
used: `getData()`, `setData(html)`, `focus()`, `destroy()`, plus the raw `editor`.

### Image upload

CKEditor's upload adapter is replaced by one function. Resolve with the public URL:

```js
const uploadImageToS3 = async (file, { onProgress, signal }) => {
  const { presigned_urls: [target] } = await getPresignedUrl({ fileNames: [file.name], richTextFile: true }, signal);
  await put(target.url, file, onProgress, signal);
  const { url } = await getPublicUrl({ key: target.key, richTextFile: true }, signal);

  return url;
};
```

Size and type limits (10MB, the types in `config.image.upload.types`) are enforced inside
the editor, as they were in the CKEditor adapter.

### Mentions

`config.mention.feeds` takes the same shape as before, including the parts the CKEditor
fork added:

```js
{
  marker: '@',
  minimumCharacters: 0,
  itemRenderer: (item) => HTMLElement,
  feed: (text, clickedItem, updateFeed) => items
}
```

- `feed` may return items synchronously, return a promise, or push later through
  `updateFeed` (this is what drives pagination).
- `item.isDisabled` renders a row that cannot be picked (headers, spinners, empty states).
- `item.nestedFeedId` + `item.isClickable` makes a drill-down row: picking it re-requests
  the feed with the row as `clickedItem` instead of inserting anything.
- `item.onSelect({ selectedItem, marker })` fires before either behaviour.
- The dropdown renders `.ck-body-wrapper > .ck-balloon-panel > ul.ck-mentions >
  li.ck-list__item > .ck-button`, the DOM CKEditor produced, because the app styles those
  class names and `useMentions` reaches into `.ck-list__item` and `.pagination-loading`.

Inserted mentions serialise exactly as before:

```html
<a class="mention" data-mention="@Jane Doe" data-resource-type="Person" data-resource-id="42" href="…">@Jane Doe</a>
```

## Feature parity

| CKEditor plugin | Here |
| --- | --- |
| Bold, Italic, Underline | Same tags: `<strong>`, `<i>`, `<u>` |
| FontSize (named presets) | `<span class="text-tiny…text-huge">` |
| Highlight | `<mark class="marker-* / pen-*">` |
| List (bulleted, numbered) | `<ul>/<ol>` with `<li>text</li>`, no wrapper paragraph |
| Indent, IndentBlock | List nesting inside lists, `margin-left` in 40px steps elsewhere |
| Link (defaultProtocol, addTargetToExternalLinks) | `target`/`rel` on absolute URLs only |
| BlockQuote | `<blockquote>` |
| RemoveFormat | Clears formatting marks and indentation, keeps links and mentions |
| Image, ImageUpload, ImageInsert, ImageResize, ImageStyle | `<figure class="image …" style="width:…">`, inline `<img>`, corner drag handles, resize presets, left/right alignment |
| Mention (Clockwork fork) | Full contract above |
| PasteFromOffice | Word and Google Docs cleanup, Word lists rebuilt |
| TextTransformation | Typography rules, minus the fractions the app removes |
| Autoformat | `**bold**`, `*italic*`, `- `, `1. `, `> ` |
| Essentials, Undo | Undo/redo, clipboard, Shift+Enter hard break |
| SpecialCharacters | `specialCharacters` toolbar item (not in the app's default toolbar) |
| ImageCaption, ImageToolbar | Deliberately absent: the app removed both |

Deliberate deviations, all visible in QA:

- **Font size button.** The app's toolbar list says `fontsize`, but CKEditor registered
  `fontSize`, so the dropdown never rendered. Toolbar names here resolve
  case-insensitively, so the button appears. Add `'fontsize'` to `excludeToolbar` to keep
  it hidden.
- **Headings and horizontal rules are parsed, not authorable.** CKEditor dropped them on
  load, which quietly rewrote old notes containing them. Here they survive a round-trip,
  but there is no button and no input rule, so `# ` and `---` stay literal text. `#` in
  particular is a mention marker in this app.
- **Strikethrough, inline code and code blocks stay out**, exactly as in the CKEditor
  build, so `~~`, backticks and fences remain literal text.

## Development

```bash
yarn install
yarn test          # vitest, includes the HTML round-trip fixtures
yarn typecheck
yarn build         # dist/index.js, dist/index.cjs, dist/style.css, d.ts files
yarn dev           # rebuild on change
```

`test/htmlFidelity.test.ts` is the guard rail for point 1 at the top of this file: every
fixture is markup taken from real CKEditor output, and each is asserted to round-trip
unchanged and to be idempotent on a second pass. Add a fixture whenever a new content
shape shows up.
