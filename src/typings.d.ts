interface Routes {
    index: string;
    order: string;
    panel: string;
    clientele: string;
    orders: string;
    calendar: string;
    tasks: string;
    analytics: string;
    settings: string;
}

type MakeLocale<Locale> = () => {
    en: Locale,
    ru: Locale,
}

interface AppStore {
    lang: string;
}

interface Stores {
    app: AppStore;
    routing: any
  }