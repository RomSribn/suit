import { observable, action, computed } from 'mobx'

class app {
  @observable lang
  @observable showUserMenu = false
  @observable isMore = false
  @observable measureBody = false
  @observable showLoginForm = false

  constructor(lang) {
    this.lang = lang || 'en'
  }

  @action closeAll() {
    this.showUserMenu = false
    this.isMore = false
    this.measureBody = false
  }

  @computed get isAnyPopup() {
    return this.showUserMenu || this.isMore || this.measureBody || this.showLoginForm
  }

}

export default  new app('en')
