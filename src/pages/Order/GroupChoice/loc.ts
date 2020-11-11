interface Loc {
  noStatus: string;
  for: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
      noStatus: 'not chosen',
      for: 'for',
  },
  ru: {
      noStatus: 'не выбрано',
      for: 'на',
  },
});

const loc = makeLoc();

export {
  loc
};