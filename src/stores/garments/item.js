import { observable } from 'mobx'

class item {
  @observable checked = false

  constructor(props) {
    Object.assign(this, props)
    
  }
}

export default item
