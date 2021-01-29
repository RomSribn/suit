interface Locale {
  choiceText: {
    first: string;
    second: string;
  };
  submit: string;
  pathItemValue: string;
  garmentsHardcodes: {
    suit: string;
    shoes: string;
    more: string;
  };
  unavailablePopupText: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    choiceText: {
      first: 'Choose garments you need and press Submit button.',
      second: 'It will let you set every garment up',
    },
    submit: 'submit',
    pathItemValue: 'garments',
    garmentsHardcodes: {
      shirt: 'shirt',
      suit: 'suit',
      shoes: 'shoes',
      more: 'more',
    },
    unavailablePopupText:
      'We are working at this section yet. Today you have access to the shirt',
  },
  ru: {
    choiceText: {
      first: 'Выберите необходимые изделия и нажмите кнопку продолжить.',
      second: 'Это позволит вам настроить каждую часть изделия.',
    },
    submit: 'продолжить',
    pathItemValue: 'изделия',
    garmentsHardcodes: {
      shirt: 'рубашка',
      suit: 'костюм',
      shoes: 'обувь',
      more: 'еще',
    },
    unavailablePopupText:
      'Мы еще работаем над этим разделом, Сегодня у вас есть доступ к рубашке',
  },
});

const loc = makeLocale();

export { loc };
