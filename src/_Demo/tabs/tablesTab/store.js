import { action, observable } from 'mobx';
import validateable from 'mobx-vm/validateable';
import modelMember from 'mobx-vm/modelMember';

import ModularViewModel from 'mobx-vm/modularViewModel';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';

class TablesTab extends ModularViewModel {
  constructor() {
    super();
    // this.email = "yaelp@gov.il"
    this.setEmail = this.setEmail.bind(this);
    this.setHouseNumber = this.setHouseNumber.bind(this);
  }
  @observable
  @modelMember()
  @validateable({ validations: [hebrew(), maxlength({ value: 5 })] })
  email = '';
  @observable
  @modelMember()
  @validateable()
  houseNumber = '';
  @action
  setEmail(value) {
    this.email = value;
  }
  @action
  setHouseNumber(value) {
    this.houseNumber = value;
  }
}

export default TablesTab;
