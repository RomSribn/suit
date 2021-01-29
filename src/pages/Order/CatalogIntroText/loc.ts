interface Locale {
  introText: {
    first: string;
    second: string;
  };
}
const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    introText: {
      first: 'Choose garments and press Submit button.',
      second: 'It will let you set every garment up',
      forHim: 'For him',
      forHer: 'For her',
    },
  },
  ru: {
    introText: {
      first: 'Выберите изделия и нажмите "продолжить"',
      second: 'Это позволит вам настроить каждую часть изделия.',
      forHim: 'Для него',
      forHer: 'Для нее',
    },
  },
});
const loc = makeLocale();

export { loc };
