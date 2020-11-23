interface Loc {
  noStatus: string;
  for: string;
  basis: string;
  reset: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
      noStatus: 'not chosen',
      for: 'for',
      basis: 'basis',
      reset: 'Reset'
  },
  ru: {
      noStatus: 'не выбрано',
      for: 'на',
      basis: 'основу',
      reset: 'Сбросить'
  },
});

const loc = makeLoc();

export {
  loc
};