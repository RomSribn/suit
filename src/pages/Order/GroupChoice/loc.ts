interface Loc {
  noStatus: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
      noStatus: 'not chosen',
  },
  ru: {
      noStatus: 'не выбрано',
  },
});

const loc = makeLoc();

export {
  loc
};