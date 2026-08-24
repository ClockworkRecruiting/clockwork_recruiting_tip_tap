export interface SpecialCharacterGroup {
  label: string;
  characters: { character: string; title: string }[];
}

const group = (label: string, entries: [string, string][]): SpecialCharacterGroup => ({
  label,
  characters: entries.map(([character, title]) => ({ character, title }))
});

/** The set CKEditor's SpecialCharactersEssentials exposed. */
export const SPECIAL_CHARACTER_GROUPS: SpecialCharacterGroup[] = [
  group('Text', [
    ['‘', 'Left single quotation mark'],
    ['’', 'Right single quotation mark'],
    ['“', 'Left double quotation mark'],
    ['”', 'Right double quotation mark'],
    ['–', 'En dash'],
    ['—', 'Em dash'],
    ['…', 'Horizontal ellipsis'],
    ['§', 'Section sign'],
    ['¶', 'Paragraph sign'],
    ['†', 'Dagger'],
    ['•', 'Bullet'],
    ['′', 'Prime'],
    ['″', 'Double prime']
  ]),
  group('Latin', [
    ['À', 'Latin capital letter a with grave'],
    ['Á', 'Latin capital letter a with acute'],
    ['Ä', 'Latin capital letter a with diaeresis'],
    ['Ç', 'Latin capital letter c with cedilla'],
    ['É', 'Latin capital letter e with acute'],
    ['Ö', 'Latin capital letter o with diaeresis'],
    ['Ü', 'Latin capital letter u with diaeresis'],
    ['à', 'Latin small letter a with grave'],
    ['á', 'Latin small letter a with acute'],
    ['ä', 'Latin small letter a with diaeresis'],
    ['ç', 'Latin small letter c with cedilla'],
    ['é', 'Latin small letter e with acute'],
    ['ñ', 'Latin small letter n with tilde'],
    ['ö', 'Latin small letter o with diaeresis'],
    ['ü', 'Latin small letter u with diaeresis'],
    ['ß', 'Latin small letter sharp s']
  ]),
  group('Currency', [
    ['$', 'Dollar sign'],
    ['£', 'Pound sign'],
    ['€', 'Euro sign'],
    ['¥', 'Yen sign'],
    ['¢', 'Cent sign'],
    ['₹', 'Indian rupee sign'],
    ['₩', 'Won sign'],
    ['₽', 'Ruble sign'],
    ['ƒ', 'Latin small letter f with hook'],
    ['¤', 'Currency sign']
  ]),
  group('Mathematical', [
    ['<', 'Less-than sign'],
    ['>', 'Greater-than sign'],
    ['≤', 'Less-than or equal to'],
    ['≥', 'Greater-than or equal to'],
    ['≠', 'Not equal to'],
    ['±', 'Plus-minus sign'],
    ['×', 'Multiplication sign'],
    ['÷', 'Division sign'],
    ['≈', 'Almost equal to'],
    ['∞', 'Infinity'],
    ['°', 'Degree sign'],
    ['%', 'Percent sign'],
    ['‰', 'Per mille sign'],
    ['½', 'Vulgar fraction one half'],
    ['¼', 'Vulgar fraction one quarter'],
    ['¾', 'Vulgar fraction three quarters']
  ]),
  group('Arrows', [
    ['←', 'Leftwards arrow'],
    ['↑', 'Upwards arrow'],
    ['→', 'Rightwards arrow'],
    ['↓', 'Downwards arrow'],
    ['↔', 'Left right arrow'],
    ['↵', 'Downwards arrow with corner leftwards'],
    ['⇒', 'Rightwards double arrow'],
    ['⇔', 'Left right double arrow']
  ]),
  group('Symbols', [
    ['©', 'Copyright sign'],
    ['®', 'Registered sign'],
    ['™', 'Trade mark sign'],
    ['★', 'Black star'],
    ['✓', 'Check mark'],
    ['✗', 'Ballot x'],
    ['✉', 'Envelope'],
    ['☎', 'Telephone']
  ])
];

export default SPECIAL_CHARACTER_GROUPS;
