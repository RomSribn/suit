import { observable } from 'mobx';

class Fitting {
  @observable value = {};

}

const store = new Fitting();

export {
  store,
};
