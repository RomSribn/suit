import { observable, action } from 'mobx';

interface Locale {
  index: string;
  order: string;
}
const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    index: 'main',
    order: 'order',
    garments: 'garments'
  },
  ru: {
    index: 'главная',
    order: 'заказать',
    garments: 'изделия'
  },
});
const loc = makeLocale();

const makeInitionalOrderPath = (lang: string) => [{
  value: loc[lang].order,
  link: '/order/details',
}, {
  value: loc[lang].garments,
  link: '/order/details',
}];

class App implements IAppStore {
  @observable lang: string;
  @observable showUserMenu = false;
  orderPath = observable.array<OrderPathItem>([]);

  constructor(lang: string) {
    this.lang = lang || 'en';
    this.orderPath.push(...makeInitionalOrderPath(lang));
  }

  @action
  setLang = (lang: string) => {
    this.lang = lang;
    this.orderPath[1].value = loc[lang].order;
    this.orderPath[2].value = loc[lang].garments;
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

}
const app = new App('ru');

export {
  app,
};
