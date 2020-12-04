interface Loc {
  noStatus: string;
  search: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
      noStatus: 'not chosen',
      search: 'Search ...'
  },
  ru: {
      noStatus: 'не выбрано',
      search: 'Поиск ...'
  },
});

const loc = makeLoc();

export {
  loc
};