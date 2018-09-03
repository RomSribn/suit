import { observable, action } from 'mobx';

interface Locale {
  index: string;
  order: string;
}
const makeLocale: MakeLocale<Locale> = () => ({
  en: {
    index: 'main',
    order: 'order',
  },
  ru: {
    index: 'главная',
    order: 'заказать',
  },
});
const loc = makeLocale();

const makeInitionalOrderPath = (lang: string) => [{
  value: loc[lang].index,
  link: '/',
}, {
  value: loc[lang].order,
  link: '/order',
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
    this.orderPath[0].value = loc[lang].index;
    this.orderPath[1].value = loc[lang].order;
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
