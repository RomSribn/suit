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
  forHim: string;
  forHer: string;
  logIn: string;
  chat: string;
  shirt: string;
  pants: string;
  jacket: string;
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
    logOut: 'log out',
    logIn: 'log in',
    forHim: 'for him',
    forHer: 'for her',
    chat: 'chat',
    shirt: 'shirt',
    pants: 'pants',
    jacket: 'jacket'
  },
  ru: {
    order: 'заказать',
    panel: 'панель',
    customersList: 'клиенты',
    orderList: 'список заказов',
    calendar: 'календарь',
    store: 'магазин',
    analytics: 'аналитика',
    settings: 'настройки',
    logOut: 'выйти',
    logIn: 'войти',
    forHim: 'для него',
    forHer: 'для нее',
    chat: 'чат',
    shirt: ' рубашка',
    pants: 'брюки',
    jacket: 'пиджак'
  },
};

const loc = makeLocale;
const localesList = Object.keys(makeLocale);

export {
  loc,
  localesList
};