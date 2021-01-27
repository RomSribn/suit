interface Locale {
  back: string;
  continue: string;
}

const makeLocale: MakeLocale<Locale> = {
  en: {
    back: 'back',
    continue: 'continue',
  },
  ru: {
    back: 'назад',
    continue: 'продолжить',
  },
};

const generateTranslatedText = (
  lang: string,
  activeItem: string,
  activeSubgroup: string,
  exceptions: {
    exceptionItem: Translations<string> | undefined;
    exceptionSubgroup: Translations<string> | undefined;
  }[],
) => {
  const accumulateString = (itemKey: string, locale: string) =>
    exceptions.map((exception) => exception[itemKey][locale]).join(', ');

  switch (lang) {
    case 'en':
      return `Elements "${activeItem}" from "${activeSubgroup}" and
         "${accumulateString('exceptionItem', 'en')}" from "${accumulateString(
        'exceptionSubgroup',
        'en',
      )}" 
         are mutually exclusive.
         Push the continue button to remove the element "${accumulateString(
           'exceptionItem',
           'en',
         )}"
         from the order.`;

    case 'ru':
      return `Элементы "${activeItem}" из подраздела "${activeSubgroup}" 
         и "${accumulateString(
           'exceptionItem',
           'ru',
         )}" из подраздела "${accumulateString('exceptionSubgroup', 'ru')}"
         исключают друг друга. Нажмите продолжить чтобы убрать
         элемент "${accumulateString('exceptionItem', 'ru')}" из заказа.`;

    default:
      return '';
  }
};

const loc = makeLocale;

export { loc, generateTranslatedText };
