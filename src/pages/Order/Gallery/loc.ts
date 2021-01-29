interface Locale {
  emptyBlockMessage: string;
  details: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    emptyBlockMessage: 'this section is empty yet',
    details: 'Details',
  },
  ru: {
    emptyBlockMessage: 'эта секция еще не заполнена',
    details: 'Подробно',
  },
});

const loc = makeLocale();

export { loc };
