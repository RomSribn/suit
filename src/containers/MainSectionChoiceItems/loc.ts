interface Locale {
  clear: string;
  noStatus: string;
  garments: {
    shirt: string;
  };
}

const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    clear: 'clear',
    noStatus: 'not chosen',
    garments: {
      shirt: 'shirt',
    },
  },
  ru: {
    clear: 'очистить',
    noStatus: 'не выбрано',
    garments: {
      shirt: 'рубашка',
    },
  },
});

const loc = makeLocale();

export { loc };
