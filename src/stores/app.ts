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

class App {
  @observable lang: string;
  @observable showUserMenu = false;
  orderPath = observable.array<OrderPathItem>([]);
  // @observable isMore = false
  // @observable measureBody = false
  // @observable showLoginForm = false

  constructor(lang: string) {
    this.lang = lang || 'en';
    this.orderPath.push({
        value: loc[lang].index,
        link: '/',
      }, {
        value: loc[lang].order,
        link: '/order',
      });
  }

  // @action closeAll() {
  //   this.showUserMenu = false
  //   this.isMore = false
  //   this.measureBody = false
  // }
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

}
const app = new App('ru');

export {
  app,
};
