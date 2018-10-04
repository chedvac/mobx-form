import { action } from 'mobx';
import validateable from 'core/validateable';
import modelMember from 'core/modelMember';

import ComplexType from 'core/complexType';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';

class TablesTab extends ComplexType {
  constructor() {
    super();
    // this.email = "yaelp@gov.il"
    this.set_email = this.set_email.bind(this);
    this.set_houseNumber = this.set_houseNumber.bind(this);
  }
  @modelMember()
  @validateable({ validations: [hebrew(), maxlength({ value: 5 })] })
  email = '';
  @modelMember()
  @validateable()
  houseNumber = '';
  @action
  set_email(value) {
    this.email = value;
  }
  @action
  set_houseNumber(value) {
    this.houseNumber = value;
  }
}

export default TablesTab;
