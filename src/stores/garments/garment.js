import { observable, action } from 'mobx'
import { find } from 'lodash'
import { callApi } from '../../utils/apiAxios'
import routes from '../../config/routes'
import group from './group'

class garment {
  @observable isFetching
  @observable error
  @observable activeGroup = false
  @observable name
  @observable groups = []

  constructor(name, section) {
    this.name = name
    this.fetch()
  }

  @action setActiveSection(section) {
    this.activeGroup = find(this.groups, {section})
  }

  @action fetch() {
    let url = `http://${routes.API_ROOT}/api/garments/${this.name}/subgroups`
    return callApi(
      {method: 'get', url},
      () => this.isFetching = true,
      this._onSuccess,
      (error) => this.error
    )
  }

  _onSuccess = (data) => {
    console.log(data)
    let groups = []
    data.design.forEach((g, i) => {
      groups.push(
        new group({
          props: g,
          section: i === 0 ? 'fabric' : 'design',
          subgroup: 'design',
          garment: this.name
        })
      )
    })
    data.fitting.forEach(g => {
      groups.push(
        new group({
          props: g,
          section: 'fitting',
          garment: this.name
        })
      )
    })

    this.groups = groups
    this.activeGroup = groups[0]
  }
}

export default garment
