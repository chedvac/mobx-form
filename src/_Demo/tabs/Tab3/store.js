import { action } from 'mobx';
import validateable from 'core/validateable';
import modelMember from 'core/modelMember';

import ComplexType from 'core/complexType';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';

class TablesTab extends ComplexType {
  constructor() {
    super();
    
    this.setEmail = this.setEmail.bind(this);
    this.setHouseNumber = this.setHouseNumber.bind(this);
  }
  @modelMember()
  @validateable({ validations: [hebrew(), maxlength({ value: 5 })] })
  email = '';
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
