interface Loc {
  submitBtn: string;
  dropMsg: string;
  requestSuccess: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
  en: {
    submitBtn: 'request a price',
    dropMsg: 'drop here...',
    requestSuccess: 'request has been sent...',
  },
  ru: {
    submitBtn: 'запросить стоимость',
    dropMsg: 'загрузить...',
    requestSuccess: 'запрос отправлен...',
  },
});

const loc = makeLoc();

export { loc };
