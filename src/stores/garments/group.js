import { observable, action, computed } from 'mobx'
import { find } from 'lodash'
import _ from 'lodash'
import { callApi } from '../../utils/apiAxios'
import {  API_ROOT } from '../../config/routes'
import item from './item'


class group {
  @observable id
  @observable title_en
  @observable title_ru
  @observable items = []
  @observable section
  @observable garment
  @observable search = ''
  @observable hovered = null

  constructor({props, section, garment}) {
    Object.assign(this, props)
    this.items = props.items.map(i => new item(i))
    this.section = section
    this.garment = garment
    //this.fetch(props.id)
  }

  set searchField(value) {
    this.offset = 0
    this.search = value
  }

  @action
  fetch(id) {
    let url = `${API_ROOT}/api/garments/${this.garment}/`
    url += `${this.section}/${this.id}`
    return callApi(
      {method: 'get', url},
      () => this.isFetching = true,
      this._onSuccess,
      (error) => this.error
    )
  }

  _onSuccess = (data) => {
    //console.log(data)
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

  @action setHovered(id) {
    if(!this.hoveredDeb) {
      this.hoveredDeb = _.debounce(() => {
        this.hovered = find(this.items, {id: id})
      }, 2000)
    }
    this.hoveredDeb()
  }

  @computed get activeItem() {
    let checked = find(this.items, {checked: true})
    return checked || null
  }

  @computed get activeItemTitle() {
    let checked = find(this.items, {checked: true})
    if(checked) {
      return checked.title_en ? checked.title_en : checked.code
    }
    return ''
  }

  @computed get list() {
    var mFilter = new RegExp(this.search, "i")
    return this.items.filter(i => mFilter.test(i.title_en) || mFilter.test(i.title_ru) || mFilter.test(i.code))
  }
}

export default group
