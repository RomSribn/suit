interface Locale {
  back: string;
  create: string;
  save: string;
  update: string;
  repeat: string;
  errorMessage: string;
  okay: string;
  oops: string;
  done: string;
  thanksHeader: string;
  thanksText: string;
}

const makeLocale = (): Translations<Locale> => ({
  en: {
    back: 'back',
    create: 'send',
    save: 'next',
    update: 'update',
    repeat: 'repeat',
    errorMessage: "Something's wrong. We recommend to try again.",
    okay: 'ok',
    oops: 'Oops',
    done: 'done',
    thanksHeader: 'Thanks, order is accepted!',
    thanksText: 'The administrator will check the order and contact you.',
  },
  ru: {
    back: 'вернуться',
    create: 'отправить',
    save: 'дальше',
    update: 'обновить',
    repeat: 'повторить',
    errorMessage: 'Что-то пошло не так. Рекомендуем повторить действие!',
    okay: 'хорошо',
    oops: 'Упс',
    done: 'готово',
    thanksHeader: 'Спасибо, заявка принята!',
    thanksText: 'Администратор проверит заказ и свяжется с вами.',
  },
});

const loc = makeLocale();

export { loc };
