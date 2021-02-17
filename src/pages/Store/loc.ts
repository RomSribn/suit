interface Loc {
  submitBtn: string;
  dropMsg: string;
  nameBtn: string;
  emailBtn: string;
  requestSuccess: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
    submitBtn: 'request a price',
    dropMsg: 'drop here...',
    nameBtn: 'name',
    emailBtn: 'email',
    requestSuccess: 'request has been sent...',
  },
  ru: {
    submitBtn: 'запросить стоимость',
    dropMsg: 'загрузить...',
    nameBtn: 'имя',
    emailBtn: 'почта',
    requestSuccess: 'запрос отправлен...',
  },
});

const loc = makeLoc();

export { loc };
