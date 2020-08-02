interface IAppStore {
  lang: Lang;
  orderPath: OrderPathItem[];
  showSwiperPopup: boolean;
  swiperPopupData: {};
  setLang: (lang: string) => void;
  pushOrderPathItem: (item: OrderPathItem) => void;
  popOrderPathItem: EmptyFunction;
  cutOrderPath: (value: string) => void;
  resetOrderPath: EmptyFunction;
  toggleMobileMenu: () => void;
  toggleSwiperPopup: () => void;
  setSwiperPopupData: (value: {}) => void;
}
