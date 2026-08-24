import { describe, expect, it } from 'vitest';
import serializeToCkHtml from '../src/html/serialize';
import { withDefaultProtocol, isExternalHref } from '../src/extensions/link';
import { createEditor, typeText } from './helpers';

const html = (editor: ReturnType<typeof createEditor>) => serializeToCkHtml(editor.getHTML());

describe('formatting commands write CKEditor markup', () => {
  it('applies a font size class', () => {
    const editor = createEditor('<p>text</p>');

    editor.chain().selectAll().setFontSize('big').run();
    expect(html(editor)).toBe('<p><span class="text-big">text</span></p>');

    editor.chain().selectAll().setFontSize('default').run();
    expect(html(editor)).toBe('<p>text</p>');

    editor.destroy();
  });

  it('applies and clears a highlight', () => {
    const editor = createEditor('<p>text</p>');

    editor.chain().selectAll().toggleHighlight('marker-blue').run();
    expect(html(editor)).toBe('<p><mark class="marker-blue">text</mark></p>');

    editor.chain().selectAll().toggleHighlight('marker-blue').run();
    expect(html(editor)).toBe('<p>text</p>');

    editor.destroy();
  });

  it('indents and outdents a paragraph in 40px steps', () => {
    const editor = createEditor('<p>text</p>');

    editor.chain().selectAll().indentBlock().run();
    expect(html(editor)).toBe('<p style="margin-left:40px;">text</p>');

    editor.chain().selectAll().indentBlock().run();
    expect(html(editor)).toBe('<p style="margin-left:80px;">text</p>');

    editor.chain().selectAll().outdentBlock().run();
    expect(html(editor)).toBe('<p style="margin-left:40px;">text</p>');

    editor.destroy();
  });

  it('nests list items instead of indenting them', () => {
    const editor = createEditor('<ul><li>one</li><li>two</li></ul>');

    editor.commands.setTextSelection(editor.state.doc.content.size - 3);
    editor.chain().indentBlock().run();

    expect(html(editor)).toBe('<ul><li>one<ul><li>two</li></ul></li></ul>');

    editor.destroy();
  });

  it('removes formatting but keeps links and indentation targets', () => {
    const editor = createEditor(
      '<p style="margin-left:40px;"><strong><span class="text-big"><mark class="marker-yellow">bold</mark></span></strong> <a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a></p>'
    );

    editor.chain().selectAll().removeFormat().run();
    const output = html(editor);

    expect(output).not.toContain('strong');
    expect(output).not.toContain('text-big');
    expect(output).not.toContain('marker-yellow');
    expect(output).not.toContain('margin-left');
    expect(output).toContain('<a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a>');

    editor.destroy();
  });

  it('adds target and rel only to absolute links', () => {
    const editor = createEditor('<p>text</p>');

    editor.chain().selectAll().setLink({ href: 'https://example.com' }).run();
    expect(html(editor)).toContain('target="_blank"');

    editor.chain().selectAll().unsetLink().setLink({ href: '/firm/people/42' }).run();
    const internal = html(editor);
    expect(internal).toContain('href="/firm/people/42"');
    expect(internal).not.toContain('target=');

    editor.destroy();
  });
});

describe('image commands', () => {
  it('sets a width on both the figure and the img', () => {
    const editor = createEditor('<figure class="image"><img src="https://cdn.test/a.png"></figure>');

    editor.chain().selectAll().setImageWidth('150').run();

    expect(html(editor)).toBe(
      '<figure class="image image_resized" style="width:150px;"><img src="https://cdn.test/a.png" style="width:150px;"></figure>'
    );

    editor.destroy();
  });

  it('toggles the alignment class', () => {
    const editor = createEditor('<figure class="image"><img src="https://cdn.test/a.png"></figure>');

    editor.chain().selectAll().setImageStyle('alignLeft').run();
    expect(html(editor)).toContain('image-style-align-left');

    editor.chain().selectAll().setImageStyle('alignLeft').run();
    expect(html(editor)).not.toContain('image-style-align-left');

    editor.destroy();
  });

  it('inserts an image by URL', () => {
    const editor = createEditor('<p></p>');

    editor.chain().insertImageByUrl('https://cdn.test/b.png').run();
    expect(html(editor)).toContain('<img src="https://cdn.test/b.png">');

    editor.destroy();
  });
});

describe('typing behaviour matches the CKEditor build', () => {
  it('keeps markdown-ish heading and strike input inert', () => {
    const editor = createEditor('<p></p>');

    typeText(editor, '# Heading');
    expect(html(editor)).toBe('<p># Heading</p>');

    editor.destroy();
  });

  it('autoformats bold, italic and lists', () => {
    const bold = createEditor('<p></p>');
    typeText(bold, '**strong** ');
    expect(html(bold)).toContain('<strong>strong</strong>');
    bold.destroy();

    const list = createEditor('<p></p>');
    typeText(list, '- item');
    expect(html(list)).toBe('<ul><li>item</li></ul>');
    list.destroy();
  });

  it('applies the typography transformations CKEditor had, and not the fractions it removed', () => {
    const editor = createEditor('<p></p>');

    typeText(editor, '(c) 1/2 ');

    const output = html(editor);
    expect(output).toContain('\u00A9');
    expect(output).toContain('1/2');
    expect(output).not.toContain('\u00BD');

    editor.destroy();
  });
});

describe('link helpers', () => {
  it('prefixes a bare host with the default protocol', () => {
    expect(withDefaultProtocol('example.com')).toBe('https://example.com');
    expect(withDefaultProtocol('https://example.com')).toBe('https://example.com');
    expect(withDefaultProtocol('mailto:a@b.com')).toBe('mailto:a@b.com');
    expect(withDefaultProtocol('/firm/people/1')).toBe('/firm/people/1');
  });

  it('classifies absolute URLs as external', () => {
    expect(isExternalHref('https://example.com')).toBe(true);
    expect(isExternalHref('//example.com')).toBe(true);
    expect(isExternalHref('/firm/people/1')).toBe(false);
  });
});
