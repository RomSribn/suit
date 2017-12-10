import { observable, action, computed } from 'mobx'
import { find, findIndex } from 'lodash'
import { callApi } from '../../utils/apiAxios'
import routes from '../../config/routes'
import group from './group'
import user from '../user'

class garment {
  @observable isFetching
  @observable error
  @observable activeGroup = false
  @observable name
  @observable groups = []

  constructor(name, garments) {
    this.name = name
    this.garments = garments
    this.fetch()
  }

  @action setActiveSection(section) {
    this.activeGroup = find(this.groups, {section})
  }

  @action setActiveGroup(groupId) {
    this.activeGroup = find(this.groups, {id: groupId})
  }

  @action nextGroup() {
    let index = findIndex(this.groups, {id: this.activeGroup.id})
    index = index !== (this.groups.length - 1) ? index + 1 : 0
    this.activeGroup = this.groups[index]
  }

  @action prevGroup() {
    let index = findIndex(this.groups, {id: this.activeGroup.id})
    index = index !== 0 ? index - 1 : this.groups.length - 1
    this.activeGroup = this.groups[index]
  }

  @computed get designGroups() {
    return this.groups.filter(g => g.section === 'design')
  }

  @computed get fittingGroups() {
    return this.groups.filter(g => g.section === 'fitting')
  }

  @action fetch() {
    let url = `http://${routes.API_ROOT}/api/garments/${this.name}/subgroups`
    return callApi(
      {method: 'get', url},
      () => this.isFetching = true,
      this._onSuccess,
      this._onError
    )
  }

  _onSuccess = (data) => {
    console.log(data)
    let groups = []
    data.design.forEach((g, i) => {
      groups.push(
        new group({
          props: g,
          section: g.id === 'fabric_ref' ? 'fabric' : 'design',
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

  _onError = (error) => {
    if(error.response.status === 401) {
      user.removeAuth()
      this.garments.list = observable([])
      this.garments.active = null
    }
  }
}

export default garment
