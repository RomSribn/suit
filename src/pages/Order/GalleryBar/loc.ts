interface Locale {
  save: string;
  okay: string;
  notCompatible: string;
  selectIt: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    save: 'save',
    okay: 'okay',
    notCompatible: 'This option is not compatible with the',
    selectIt: 'To select it, change the subsection',
  },
  ru: {
    save: 'сохранить',
    okay: 'хорошо',
    notCompatible: 'Опция несовместима с элементом',
    selectIt: 'Для ее выбора внесите изменения в подраздел',
  },
});

const loc = makeLocale();

export { loc };
