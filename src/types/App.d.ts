interface IAppStore {
  addVisitedChoiceItem: (name: string) => void;
  changeSearchedItemsCount: () => void;
  clearVisitedChoiceItems: () => void;
  currentSearchValue: string;
  cutOrderPath: (value: string) => void;
  isGarmentLoaded: boolean;
  isSearchBarOpened: boolean;
  lang: Lang;
  orderPath: OrderPathItem[];
  popOrderPathItem: EmptyFunction;
  pushOrderPathItem: (item: OrderPathItem) => void;
  removeVisitedChoiceItem: (name: string) => void;
  resetOrderPath: EmptyFunction;
  searchedItemsCount: number;
  setCurrentSearchValue: (text: string) => void;
  setIsGarmentLoaded: (isGarmentLoaded: boolean) => void;
  setLang: (lang: string) => void;
  setSwiperPopupData: (value: {}) => void;
  showLoginForm: boolean;
  showSwiperPopup: boolean;
  swiperPopupData: {};
  toggleIsSearchBarOpened: () => void;
  toggleLoginForm: () => void;
  toggleMobileMenu: () => void;
  toggleSwiperPopup: () => void;
  visitedChoiceItems: string[];
}
