import { observable } from 'mobx'

class app {
  @observable lang

  constructor(lang) {
    this.lang = lang || 'en'
  }

  set lang(lang) {
    this.lang = lang
  }

  get lang() {
    return this.lang
  }
}

export default  new app('en')
