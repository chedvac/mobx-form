import { action, observable } from 'mobx';
import validateable from 'mobx-vm/validateable';
import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/modularViewModel';

class Tab3 extends ModularViewModel {
  constructor() {
    super();
    this.setGender = this.setGender.bind(this);
  }

  /* ---------------------MODEL MEMBERS----------------------- */
  @observable
  @modelMember()
  @validateable()
  gender = '2';

  /* ------------------------ACTIONS-------------------------- */
  @action.bound
  setGender(value) {
    this.gender = value;
  }
}

export default Tab3;
