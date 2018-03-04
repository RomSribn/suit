import { observable, action } from 'mobx';

class App {
  @observable lang: string;
  // @observable showUserMenu = false
  // @observable isMore = false
  // @observable measureBody = false
  // @observable showLoginForm = false

  constructor(lang: string) {
    this.lang = lang || 'en';
  }

  // @action closeAll() {
  //   this.showUserMenu = false
  //   this.isMore = false
  //   this.measureBody = false
  // }
  @action changeLanguage(lang: string) {
    this.lang = lang;
  }
  // @computed get isAnyPopup() {
  //   return this.showUserMenu || this.isMore || this.measureBody || this.showLoginForm
  // }

}
const app = new App('en');

export {
  app,
};
