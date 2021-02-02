interface Loc {
  title: string;
  placeholder: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
    title: 'text',
    placeholder: 'not chosen',
  },
  ru: {
    title: 'текст',
    placeholder: 'не выбрано',
  },
});

const loc = makeLoc();

export { loc };
