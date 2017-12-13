import { observable } from 'mobx'


class fitting {
  @observable value = ''
  @observable active = false

  constructor(props) {
    Object.assign(this, props)
  }
}

export default fitting
