import { observable } from 'mobx'
import { find } from 'lodash'
//import { callApi } from '../../utils/apiAxios'
//import routes from '../../config/routes'
import garment from './garment'



class garments {
  @observable.shallow list = []
  @observable active = null
  @observable isMore = false

  setGarment(garmentName) {
    let clickedGarment = find(this.list, {'name': garmentName})
    if(!clickedGarment) {
      clickedGarment = new garment(garmentName, this)
    }
    this.list.push(clickedGarment)
    this.active = clickedGarment
  }

}

export default new garments()
