interface Loc {
  for: string;
  basis: string;
  reset: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
      for: 'for',
      basis: 'basis',
      reset: 'reset'
  },
  ru: {
      for: 'на',
      basis: 'основу',
      reset: 'сбросить'
  },
});

const loc = makeLoc();

export {
  loc
};