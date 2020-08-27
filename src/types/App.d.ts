interface IAppStore {
  lang: Lang;
  orderPath: OrderPathItem[];
  currentSearchValue: string;
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
  showSwiperPopup: boolean;
  isSearchBarOpened: boolean;
  swiperPopupData: {};
  searchedItemsCount: number;
  changeSearchedItemsCount: () => void;
  toggleSwiperPopup: () => void;
  toggleIsSearchBarOpened: () => void;
  setSwiperPopupData: (value: {}) => void;
  setCurrentSearchValue: (text: string) => void;
}
