interface IAppStore {
    lang: Lang;
    orderPath: OrderPathItem[];
    setLang: (lang: string) => void;
    pushOrderPathItem: (item: OrderPathItem) => void;
    popOrderPathItem: EmptyFunction;
    cutOrderPath: (value: string) => void;
    resetOrderPath: EmptyFunction;
    toggleMobileMenu: () => void;
    addVisitedChoiceItem: (name: string) => void;
    removeVisitedChoiceItem: (name: string) => void;
    visitedChoiceItems: string[];
    clearVisitedChoiceItems: () => void;
  }