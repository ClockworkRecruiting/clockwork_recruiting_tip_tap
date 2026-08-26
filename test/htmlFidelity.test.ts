import { describe, expect, it } from 'vitest';
import { canonical, roundTrip } from './helpers';

/**
 * Every fixture is HTML the CKEditor build wrote into the notes table. Loading it
 * and saving it again has to produce the same markup, otherwise existing notes
 * would silently change the first time somebody opens them.
 */
const FIXTURES: Array<[string, string]> = [
  ['plain paragraph', '<p>Spoke with the candidate today.</p>'],
  ['basic styles', '<p>Hello <strong>bold</strong> <i>italic</i> <u>underlined</u></p>'],
  ['font sizes', '<p><span class="text-tiny">tiny</span> <span class="text-small">small</span> <span class="text-big">big</span> <span class="text-huge">huge</span></p>'],
  ['highlights', '<p><mark class="marker-yellow">yellow</mark> <mark class="marker-blue">blue</mark> <mark class="pen-red">red pen</mark></p>'],
  ['bulleted list', '<ul><li>First</li><li>Second</li></ul>'],
  ['numbered list', '<ol><li>First</li><li>Second</li></ol>'],
  ['nested list', '<ul><li>Parent<ul><li>Child</li></ul></li></ul>'],
  ['indented paragraph', '<p style="margin-left:40px;">Indented once</p>'],
  ['twice indented paragraph', '<p style="margin-left:80px;">Indented twice</p>'],
  ['block quote', '<blockquote><p>Quoted text</p></blockquote>'],
  ['external link', '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">example</a></p>'],
  ['internal link', '<p><a href="/firm/people/42">person</a></p>'],
  [
    'mention',
    '<p><a class="mention" data-mention="@Jane Doe" data-resource-type="Person" data-resource-id="42" href="https://app.test/firm/people/42">@Jane Doe</a> please review</p>'
  ],
  [
    'hash mention',
    '<p><a class="mention" data-mention="#Acme / CTO" data-resource-type="Project" data-resource-id="7" href="https://app.test/firm/projects/7">#Acme / CTO</a></p>'
  ],
  [
    'bold mention',
    '<p><strong><a class="mention" data-mention="@Jane Doe" data-resource-type="Person" data-resource-id="42" href="https://app.test/firm/people/42">@Jane Doe</a></strong></p>'
  ],
  [
    'mention inside a list item',
    '<ul><li>Ask <a class="mention" data-mention="@Jane Doe" data-resource-type="Person" data-resource-id="42" href="https://app.test/firm/people/42">@Jane Doe</a></li></ul>'
  ],
  ['non-breaking space inside a sentence', '<p>Fee:&nbsp;30%</p>'],
  ['line break', '<p>First line<br>Second line</p>'],
  ['special characters', '<p>Fee: 33⅓% — see §4 (©2026)</p>'],
  ['multiple paragraphs', '<p>One</p><p>Two</p><p>Three</p>']
];

describe('CKEditor HTML round-trips unchanged', () => {
  it.each(FIXTURES)('%s', (_name, html) => {
    expect(canonical(roundTrip(html))).toBe(canonical(html));
  });

  it('keeps an empty note empty', () => {
    expect(roundTrip('')).toBe('');
    expect(roundTrip('<p>&nbsp;</p>')).toBe('');
  });

  it('is idempotent: a second pass changes nothing', () => {
    FIXTURES.forEach(([, html]) => {
      const once = roundTrip(html);
      expect(canonical(roundTrip(once))).toBe(canonical(once));
    });
  });
});

describe('images', () => {
  it('keeps a plain block image', () => {
    const html = '<figure class="image"><img src="https://cdn.test/a.png"></figure>';

    expect(canonical(roundTrip(html))).toBe(canonical(html));
  });

  it('keeps a resized block image, width on both figure and img', () => {
    const html = '<figure class="image image_resized" style="width:150px;"><img src="https://cdn.test/a.png" style="width:150px;"></figure>';

    expect(canonical(roundTrip(html))).toBe(canonical(html));
  });

  it('keeps image alignment styles', () => {
    const html = '<figure class="image image-style-align-right" style="width:250px;"><img src="https://cdn.test/a.png" style="width:250px;"></figure>';

    expect(canonical(roundTrip(html))).toContain('image-style-align-right');
  });

  it('keeps an inline image inside a paragraph', () => {
    const html = '<p>Logo <img class="image_resized" style="width:120px;" src="https://cdn.test/a.png"> here</p>';

    expect(canonical(roundTrip(html))).toBe(canonical(html));
  });

  it('drops captions, as the CKEditor build did (ImageCaption was removed)', () => {
    const html = '<figure class="image"><img src="https://cdn.test/a.png"><figcaption>Caption</figcaption></figure>';

    expect(roundTrip(html)).not.toContain('figcaption');
  });
});

describe('legacy content', () => {
  it('maps CKEditor 4 inline font sizes onto the class scale', () => {
    expect(roundTrip('<p><span style="font-size:18px">large</span></p>')).toContain('class="text-big"');
  });

  it('accepts em and b from pasted content and writes CKEditor tags', () => {
    const output = roundTrip('<p><b>bold</b> <em>italic</em></p>');

    expect(output).toContain('<strong>bold</strong>');
    expect(output).toContain('<i>italic</i>');
  });

  it('preserves headings and rules that older notes contain', () => {
    expect(roundTrip('<h2>Summary</h2><p>Body</p>')).toContain('<h2>Summary</h2>');
    expect(roundTrip('<p>a</p><hr><p>b</p>')).toContain('<hr>');
  });

  it('keeps a mention written by the stock CKEditor converter', () => {
    const output = roundTrip('<p><span class="mention" data-mention="@Jane">@Jane</span></p>');

    expect(output).toContain('data-mention="@Jane"');
    expect(output).toContain('class="mention"');
  });
});
