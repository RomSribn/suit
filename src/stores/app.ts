import { observable, action } from 'mobx';
import { isMenuHiddenLinkParamsId } from '../config/constants';
import userStore from './user';

type LocaleTextFields = 'index' | 'order' | 'garments' | 'shirt';

type Locale = Record<LocaleTextFields, string>;

const loc: Translations<Locale> = {
  en: {
    index: 'main',
    order: 'order',
    garments: 'garments',
    shirt: 'shirt',
  },
  ru: {
    index: 'главная',
    order: 'заказать',
    garments: 'изделия',
    shirt: 'сорочка',
  },
};

const makeInitionalOrderPath = (lang: Lang) => [
  {
    value: loc[lang].order,
    link: '/order/details/shirt',
  },
  {
    value: loc[lang].shirt,
    link: '/order/details/shirt',
  },
];

const setIsMenuHiddenLinkId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isMenuHidden =
    urlParams.get(isMenuHiddenLinkParamsId) === process.env.IS_MENU_HIDDEN_LINK;
  if (isMenuHidden) {
    sessionStorage.setItem(isMenuHiddenLinkParamsId, 'true');
  }
};

export class App implements IAppStore {
  @observable lang: Lang;
  @observable showMobileMenu = false;
  @observable showSwiperPopup = false;
  @observable swiperPopupData = {};
  @observable visitedChoiceItems = observable.array<string>();
  @observable showLoginForm = false;
  @observable currentSearchValue = ' ';
  @observable isSearchBarOpened = false;
  @observable dummyY = 0;
  @observable isGarmentLoaded = true;
  @observable isMenuUncovered = false;
  @observable isMenuUncoveredInitial = false;
  @observable searchedItemsCount = 1;
  @observable orderPath = observable.array<OrderPathItem>([]);
  @observable isMenuHidden: TIsMenuHidden = false;

  constructor(lang?: Lang) {
    const newLang = lang || 'en';
    this.lang = newLang;
    this.orderPath.push(...makeInitionalOrderPath(newLang));
    if (userStore.isAuth) {
      return;
    }
    setIsMenuHiddenLinkId();
    this.isMenuHidden = !!sessionStorage.getItem(isMenuHiddenLinkParamsId);
  }

  @action
  setCurrentSearchValue = (text: string) => {
    if (text === '') {
      this.currentSearchValue = ' ';
    } else {
      this.searchedItemsCount = 0;
      this.currentSearchValue = text;
    }
  };

  @action
  changeSearchedItemsCount = () => {
    this.searchedItemsCount = 2;
  };

  @action
  toggleMobileMenu = () => {
    this.showMobileMenu = !this.showMobileMenu;
  };

  @action
  toggleLoginForm = () => {
    this.showLoginForm = !this.showLoginForm;
  };

  @action
  setDummyY = (y: number) => {
    this.dummyY = y;
  };

  @action
  setIsMenuUncovered = (isMenuUncovered: TIsMenuUncovered) => {
    this.isMenuUncovered = isMenuUncovered;
  };

  @action
  setIsMenuUncoveredInitial = (
    isMenuUncoveredInitial: TIsMenuUncoveredInitial,
  ) => {
    this.isMenuUncoveredInitial = isMenuUncoveredInitial;
  };

  @action
  toggleIsSearchBarOpened = () => {
    this.isSearchBarOpened = !this.isSearchBarOpened;
  };

  @action
  setLang = (lang: Lang) => {
    this.lang = lang;
    this.orderPath[0].value = loc[lang].order;
    this.orderPath[1].value = loc[lang].shirt;
  };
  @action
  pushOrderPathItem = (item: OrderPathItem) => {
    this.orderPath.push(item);
  };
  @action
  popOrderPathItem = () => {
    this.orderPath.pop();
  };
  @action
  cutOrderPath = (value: string) => {
    const valueIndex = this.orderPath.findIndex((el) => el.value === value);
    if (valueIndex > -1) {
      this.orderPath.splice(valueIndex + 1);
    }
  };

  @action
  resetOrderPath = () => {
    this.orderPath = observable.array<OrderPathItem>(
      makeInitionalOrderPath(this.lang),
    );
  };

  @action
  addVisitedChoiceItem = (name: string) => {
    if (!this.visitedChoiceItems.includes(name)) {
      this.visitedChoiceItems.push(name);
    }
  };

  @action
  removeVisitedChoiceItem = (name: string) => {
    this.visitedChoiceItems.remove(name);
  };

  @action
  clearVisitedChoiceItems = () => {
    this.visitedChoiceItems.clear();
  };

  @action
  toggleSwiperPopup = () => {
    this.showSwiperPopup = !this.showSwiperPopup;
  };

  @action
  setSwiperPopupData = (value: {}) => {
    this.swiperPopupData = value;
  };

  @action
  setIsGarmentLoaded = (isGarmentLoaded: boolean) => {
    this.isGarmentLoaded = isGarmentLoaded;
  };

  @action
  setIsMenuHidden = (isMenuHidden: TIsMenuHidden) => {
    this.isMenuHidden = isMenuHidden;
    if (!isMenuHidden) {
      sessionStorage.removeItem(isMenuHiddenLinkParamsId);
    }
  };
}
const app = new App('ru');

export { app };
