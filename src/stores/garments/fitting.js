import { observable } from 'mobx'


class fitting {
  @observable value = ''

  constructor(props) {
    Object.assign(this, props)
  }
}

export default fitting
