interface Locale {
  order: string;
  panel: string;
  customersList: string;
  orderList: string;
  calendar: string;
  store: string;
  analytics: string;
  settings: string;
  logOut: string;
}

const makeLocale: MakeLocale<Locale> = {
  en: {
      order: 'order',
      panel: 'panel',
      customersList: 'clients',
      orderList: 'order list',
      calendar: 'calendar',
      store: 'store',
      analytics: 'analytics',
      settings: 'settings',
      logOut: 'log out'
  },
  ru: {
      order: 'заказ',
      panel: 'панель',
      customersList: 'клиенты',
      orderList: 'список заказов',
      calendar: 'календарь',
      store: 'магазин',
      analytics: 'аналитика',
      settings: 'настройки',
      logOut: 'выйти'
  },
};

const loc = makeLocale;
const localesList = Object.keys(makeLocale);

export {
  loc,
  localesList
};