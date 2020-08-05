import { observable, action } from 'mobx';

type LocaleTextFields = 'index'|'order'|'garments'|'shirt';

type Locale = Record<LocaleTextFields, string>;

const loc: Translations<Locale> = {
  en: {
    index: 'main',
    order: 'order',
    garments: 'garments',
    shirt: 'shirt'
  },
  ru: {
    index: 'главная',
    order: 'заказать',
    garments: 'изделия',
    shirt: 'рубашка'
  },
};

const makeInitionalOrderPath = (lang: Lang) => [{
  value: loc[lang].order,
  link: '/order/details/shirt',
}, {
  value: loc[lang].shirt,
  link: '/order/details/shirt',
}];

export class App implements IAppStore {
  @observable lang: Lang;
  @observable showMobileMenu = false;
  @observable showSwiperPopup = false;
  @observable swiperPopupData = {};
  @observable visitedChoiceItems = observable.array<string>();
  orderPath = observable.array<OrderPathItem>([]);

  constructor(lang?: Lang) {
    const newLang = lang || 'en';
    this.lang = newLang;
    this.orderPath.push(...makeInitionalOrderPath(newLang));
  }

  @action
  toggleMobileMenu = () => {
    this.showMobileMenu = !this.showMobileMenu;
  }

  @action
  setLang = (lang: Lang) => {
    this.lang = lang;
    this.orderPath[0].value = loc[lang].order;
    this.orderPath[1].value = loc[lang].shirt;
  }
  @action
  pushOrderPathItem = (item: OrderPathItem) => {
    this.orderPath.push(item);
  }
  @action
  popOrderPathItem = () => {
    this.orderPath.pop();
  }
  @action
  cutOrderPath = (value: string) => {
    const valueIndex = this.orderPath.findIndex(el => el.value === value);
    if (valueIndex > -1) {
      this.orderPath.splice(valueIndex + 1);
    }
  }

  @action
  resetOrderPath = () => {
    this.orderPath = observable.array<OrderPathItem>(makeInitionalOrderPath(this.lang));
  }

  @action
  addVisitedChoiceItem = (name: string) => {
    if (!this.visitedChoiceItems.includes(name)) {
      this.visitedChoiceItems.push(name);
    }
  }

  @action
  removeVisitedChoiceItem = (name: string) => {
    this.visitedChoiceItems.remove(name);
  }

  @action
  clearVisitedChoiceItems = () => {
    this.visitedChoiceItems.clear();
  }

  @action 
  toggleSwiperPopup = () => {
    this.showSwiperPopup = !this.showSwiperPopup;
  }

  @action
  setSwiperPopupData = (value: {}) => {
    this.swiperPopupData = value;
  }

}
const app = new App('ru');

export {
  app,
};
