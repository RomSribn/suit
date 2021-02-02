export interface Languages {
  en: string;
  ru: string;
}
interface Locale {
  language: string;
  languages: Languages;
  languagesShortcut: Languages;
}

const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    language: 'language',
    languages: {
      en: 'english',
      ru: 'русский',
    },
    languagesShortcut: {
      en: 'en',
      ru: 'ru',
    },
  },
  ru: {
    language: 'язык',
    languages: {
      en: 'english',
      ru: 'русский',
    },
    languagesShortcut: {
      en: 'en',
      ru: 'ru',
    },
  },
});

const loc = makeLocale();

export { loc };
