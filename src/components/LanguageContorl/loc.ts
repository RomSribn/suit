export interface Languages {
    en: string;
    ru: string;
}
interface Locale {
    language: string;
    languages: Languages;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        language: 'language',
        languages: {
            en: 'english',
            ru: 'русский',
        },
        
    },
    ru: {
        language: 'язык',
        languages: {
            en: 'english',
            ru: 'русский',
        },
    },
});

const loc = makeLocale();

export {
    loc,
};