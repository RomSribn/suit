import { observable, action, computed } from 'mobx'
import _ from 'lodash'
import { callApi } from '../../utils/apiAxios'
import serialize from '../../utils/serialize'
import { API_ROOT } from '../../config/routes.ts'
import group from './group'

class fabricGroup extends group {
  @observable offset = 50
  @observable limit = 50
  @observable total = 100

  nextPage = () => {
    this.fetch({
      search: this.search,
      offset: this.offset,
      limit: this.limit
    })
  }

  set searchField(value) {
    this.offset = 0
    this.search = value
    this.total = 100
    if(!this.searchDeb) {
      this.searchDeb = _.debounce(this.nextPage, 2000)
    }
    this.searchDeb()
  }

  @computed get isMoreData() {
    return !(this.items.length >= this.total)
  }

  @action fetch(dataParams) {
    if(!this.isMoreData) {
      return false
    }
    let url = `${API_ROOT}/api/garments/${this.garment}/fabric_ref`
    url += serialize(dataParams)
    return callApi(
      {method: 'get', url},
      () => this.isFetching = true,
      this._onSuccess,
      (error) => this.error
    )
  }

  _onSuccess = (data, headers) => {
    console.log(data)
    let items = data.map(i => observable({
      ...i,
      checked: false
    }))

    this.total = headers['x-pagination-count']
    if(this.offset === 0) {
      this.items = items
    } else {
      this.items = this.items.slice().concat(items)
    }
    this.offset += this.limit
  }
}

export default fabricGroup
