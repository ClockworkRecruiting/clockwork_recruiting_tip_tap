export interface SpecialCharacterGroup {
    label: string;
    characters: {
        character: string;
        title: string;
    }[];
}
/** The set CKEditor's SpecialCharactersEssentials exposed. */
export declare const SPECIAL_CHARACTER_GROUPS: SpecialCharacterGroup[];
export default SPECIAL_CHARACTER_GROUPS;
