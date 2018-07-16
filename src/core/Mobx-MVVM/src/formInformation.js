import { action } from 'mobx';
import formObservable from 'core/formObservable';
import ComplexType from 'core/ComplexType';

class FormInformation extends ComplexType {
  constructor() {
    super();
    this.set_isFormSent = this.set_isFormSent.bind(this);
  }
  @formObservable() isFormSent = false;
  @action
  set_isFormSent = function(value) {
    this.isFormSent = value;
  };
}

export default FormInformation;
