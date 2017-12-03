import { observable, action } from 'mobx'
import { find } from 'lodash'
import { callApi } from '../../utils/apiAxios'
import routes from '../../config/routes'



class group {
  @observable id
  @observable title_en
  @observable title_ru
  @observable.deep items = []
  @observable section
  @observable garment
  @observable subgroup

  constructor({props, section, garment, subgroup}) {
    this.id = props.id
    this.title_en = props.title_en
    this.title_ru = props.title_ru
    this.section = section
    this.garment = garment
    this.subgroup = subgroup
    this.fetch(props.id)
  }

  @action fetch(id) {
    let url = `http://${routes.API_ROOT}/api/garments/${this.garment}/`
    url += `${this.subgroup ? this.subgroup : this.section}/${this.id}`
    return callApi(
      {method: 'get', url},
      () => this.isFetching = true,
      this._onSuccess,
      (error) => this.error
    )
  }

  _onSuccess = (data) => {
    this.items = data.map(i => observable({
      ...i,
      checked: false
    }))
  }

  @action setChecked(id) {
    let checked = find(this.items, {checked: true})
    if(checked) {
      checked.checked = false
    }
    find(this.items, {id: id}).checked = true
  }
}

export default group
