import { observable, computed, action } from 'mobx'
import { find } from 'lodash'
import { callApi } from '../../utils/apiAxios'
import routes from '../../config/routes'
import garment from './garment'



class garments {
  @observable.shallow list = []
  @observable active = null
  @observable orderId = null
  @observable isFetching = false
  @observable error = {}
  @observable pushedToSalon = true


  setGarment(garmentName) {
    let clickedGarment = find(this.list, {'name': garmentName})
    if(!clickedGarment) {
      clickedGarment = new garment(garmentName, this)
    }
    this.list.push(clickedGarment)
    this.active = clickedGarment
  }

  @computed get garmentsWithAcitve() {
    return this.list.filter(g => g.groupsWithActiveItems)
  }

  @computed get orderContent() {
    const content = {}
    this.list.forEach(g => {
      content[g.name] = content[g.name] || []
      content[g.name].push({
        design: g.designToOrder,
        fabric: {
          id: g.fabric.activeItem ? g.fabric.activeItem.id : null
        },
        fitting: g.fittingToOrder
      })
    })
    console.log('order content', content)
    return content
  }

  @action sendOrderToSalonAdmin() {
    this.pushedToSalon = true
    this.sendOrder()
  }

  @action sendOrder() {
    if(this.orderId) {
      return
    }
    let url = `http://${routes.API_ROOT}/api/orders`
    if(this.orderId) {
      url += `/${this.orderId}/version`
    }
    return callApi(
      {
        method: 'POST',
        url,
        data: {
          content: this.orderContent
        }
      },
      () => this.isFetching = true,
      this._onSuccess,
      (error) => this.error
    )
  }

  _onSuccess(data) {
    console.log(data)
    this.orderId = data.id
    if(!this.pushToSalonAdmin) {
      this.pushToSalonAdmin()
    }
  }

  @action pushToSalonAdmin() {
    let url = `http://${routes.API_ROOT}/api/orders/${this.orderId}/pushToSalonAdmin`
    return callApi(
      {method: 'POST', url},
      () => this.isFetching = true,
      () => this.pushedToSalon = true,
      (error) => this.error
    )
  }

}

export default new garments()
