import { observable, action, computed } from 'mobx';
import { find, findIndex } from 'lodash';
import { callApi } from '../../utils/apiAxios';
import { API_ROOT } from '../../config/routes';
import group from './group';
import fabricGroup from './fabricGroup';
import user from '../user';
import fitting from './fitting';

class garment {
  @observable isFetching;
  @observable error;
  @observable activeGroup = false;
  @observable name;
  @observable groups = [];
  @observable fittings = [];
  @observable section = 'fabric';

  constructor(name, garments) {
    this.name = name;
    this.garments = garments;
    this.fetch();
  }

  @action setActiveSection(section) {
    this.activeGroup = find(this.groups, { section });
    this.section = section;
  }

  @action setActiveGroup(groupId) {
    this.activeGroup = find(this.groups, { id: groupId });
    this.section = this.activeGroup.section;
  }

  @action nextGroup() {
    let index = findIndex(this.groups, { id: this.activeGroup.id });
    index = index !== this.groups.length - 1 ? index + 1 : 0;
    this.activeGroup = this.groups[index];
    this.section = this.activeGroup.section;
  }

  @action prevGroup() {
    let index = findIndex(this.groups, { id: this.activeGroup.id });
    index = index !== 0 ? index - 1 : this.groups.length - 1;
    this.activeGroup = this.groups[index];
    this.section = this.activeGroup.section;
  }

  @computed get designGroups() {
    return this.groups.filter((g) => g.section === 'design');
  }

  @computed get designWithActiveItems() {
    return this.groups.filter((g) => g.activeItem && g.section === 'design');
  }

  @computed get groupsWithActiveItems() {
    return this.groups.filter((g) => g.activeItem);
  }

  @computed get designToOrder() {
    const design = {};
    this.designWithActiveItems.forEach((g) => {
      design[g.id] = g.activeItem.id;
    });
    return design;
  }

  @computed get fabric() {
    return this.groups.find((g) => g.id === 'fabric_ref');
  }

  @computed get fittingToOrder() {
    const fitting = {};
    this.fittings.forEach((f) => {
      if (f.value) {
        fitting[f.id] = f.value;
      }
    });
    return fitting;
  }

  set activeFitting(fitting) {
    let oldActive = this.fittings.find((f) => f.active);
    if (oldActive) {
      oldActive.active = false;
    }
    fitting.active = true;
  }

  @computed get activeFitting() {
    const fitting = this.fittings.find((f) => f.active);
    return fitting ? fitting : this.fittings[0];
  }

  @action fetch() {
    // TODO: refactor to the new API response
    let url = `${API_ROOT}/api/garments/${this.name}/design`;
    return callApi(
      { method: 'get', url },
      () => (this.isFetching = true),
      this._onSuccess,
      this._onError,
    );
  }

  _onSuccess = (data) => {
    let groups = [];
    groups.push(
      new fabricGroup({
        props: data.fabric_ref,
        section: 'fabric',
        garment: this.name,
      }),
    );
    data.design.forEach((g, i) => {
      groups.push(
        new group({
          props: g,
          section: 'design',
          garment: this.name,
        }),
      );
    });

    this.fittings = data.fitting.map((f) => new fitting(f));
    this.groups = groups;
    this.activeGroup = groups[0];
  };

  _onError = (error) => {
    if (error.response.status === 401) {
      user.removeAuth();
      this.garments.list = observable([]);
      this.garments.active = null;
    }
  };
}

export default garment;
