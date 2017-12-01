import { observable } from 'mobx'

class garments {
  @observable.shallow list = []

  set grament(garment) {
    this.list.push(garment)
  }
}

export default new garments()
