import { routesTranslations } from '../../config/routes';
interface Locale {
  navigation: {
    order: string;
    panel: string;
    customersList: string;
    ordersList: string;
    calendar: string;
    store: string;
    analytics: string;
    settings: string;
  };
  hideShow: string;
}
const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    navigation: routesTranslations.en,
    hideShow: 'Hide/show element',
  },
  ru: {
    navigation: routesTranslations.ru,
    hideShow: 'Скрыть/показать элемент',
  },
});
const loc = makeLocale();

export { loc };
