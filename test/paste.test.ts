import { describe, expect, it } from 'vitest';
import { transformOfficeHtml } from '../src/extensions/pasteOffice';
import serializeToCkHtml from '../src/html/serialize';
import { createEditor } from './helpers';

const throughEditor = (pasted: string) => {
  const editor = createEditor(transformOfficeHtml(pasted));
  const output = serializeToCkHtml(editor.getHTML());
  editor.destroy();

  return output;
};

describe('paste from Word', () => {
  const WORD = `<html xmlns:o="urn:schemas-microsoft-com:office:office"><head><style>p.MsoNormal{margin:0}</style></head>
    <body><!--StartFragment--><p class="MsoNormal"><span style="font-family:Calibri;font-weight:bold">Candidate summary</span><o:p></o:p></p>
    <p class="MsoListParagraph" style="mso-list:l0 level1 lfo1"><span style="mso-list:Ignore">&#8226;<span>&nbsp;</span></span>Strong operator</p>
    <p class="MsoListParagraph" style="mso-list:l0 level1 lfo1"><span style="mso-list:Ignore">&#8226;<span>&nbsp;</span></span>Ex-Google</p>
    <!--EndFragment--></body></html>`;

  it('drops Word noise', () => {
    const cleaned = transformOfficeHtml(WORD);

    expect(cleaned).not.toContain('mso-');
    expect(cleaned).not.toContain('MsoNormal');
    expect(cleaned).not.toContain('o:p');
    expect(cleaned).not.toContain('<style');
  });

  it('keeps bold as a real tag', () => {
    expect(throughEditor(WORD)).toContain('<strong>Candidate summary</strong>');
  });

  it('rebuilds the bullet list', () => {
    const output = throughEditor(WORD);

    expect(output).toContain('<ul>');
    expect(output).toContain('<li>Strong operator</li>');
    expect(output).toContain('<li>Ex-Google</li>');
  });
});

describe('paste from Google Docs', () => {
  const DOCS = `<meta charset="utf-8"><b id="docs-internal-guid-1" style="font-weight:normal"><p dir="ltr"
    style="line-height:1.2;margin-top:0pt"><span style="font-size:11pt;font-family:Arial;font-weight:700">Screened</span>
    <span style="font-size:11pt;font-style:italic">by phone</span></p></b>`;

  it('converts styled spans into tags and drops the rest', () => {
    const output = throughEditor(DOCS);

    expect(output).toContain('<strong>Screened</strong>');
    expect(output).toContain('<i>by phone</i>');
    expect(output).not.toContain('font-family');
    expect(output).not.toContain('docs-internal-guid');
  });
});

describe('ordinary HTML is left alone', () => {
  it('does not touch content that is not from Office', () => {
    const html = '<p>Hello <strong>there</strong></p>';

    expect(transformOfficeHtml(html)).toBe(html);
  });
});
