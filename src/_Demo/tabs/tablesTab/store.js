import { observable, autorun, action } from 'mobx';
import formObservable from '../../../core/formObservable';
import modelProp from '../../../core/modelProp';

import ComplexType from '../../../core/ComplexType';
import { hebrewName } from 'validations/rules/languages';
import { maxlength } from 'validations/rules/general';

class TablesTab extends ComplexType {
  constructor() {
    super();
    // this.email = "yaelp@gov.il"
    this.set_email = this.set_email.bind(this);
    this.set_houseNumber = this.set_houseNumber.bind(this);
  }
  @modelProp()
  @formObservable({ validations: [hebrewName(), maxlength({ value: 5 })] })
  email = '';
  @modelProp()
  @formObservable()
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
