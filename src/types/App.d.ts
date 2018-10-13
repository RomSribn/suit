interface IAppStore {
    lang: Lang;
    showUserMenu: boolean;
    orderPath: OrderPathItem[];
    setLang: (lang: string) => void;
    pushOrderPathItem: (item: OrderPathItem) => void
    popOrderPathItem: EmptyFunction;
    cutOrderPath: (value: string) => void;
    resetOrderPath: EmptyFunction;
  }