import { observable } from 'mobx'

class app {
  @observable lang
  @observable showUserMenu = false

  constructor(lang) {
    this.lang = lang || 'en'
  }

}

export default  new app('en')
