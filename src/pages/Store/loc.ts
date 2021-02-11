interface Loc {
  submitBtn: string;
  dropMsg: string;
  nameBtn: string;
  emailBtn: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
    submitBtn: 'request a price',
    dropMsg: 'drop here...',
    nameBtn: 'name',
    emailBtn: 'email',
  },
  ru: {
    submitBtn: 'запросить стоимость',
    dropMsg: 'загрузить...',
    nameBtn: 'имя',
    emailBtn: 'почта',
  },
});

const loc = makeLoc();

export { loc };
