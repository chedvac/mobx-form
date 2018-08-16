import { action } from 'mobx';
import validateable from 'core/validateable';
import ComplexType from 'core/complexType';

class Language extends ComplexType {
  constructor() {
    super();
    const self = this;

    this.actions = {
      @action
      set_name: value => {
        this.model.name = value;
      }
    };
  }
  @validateable() name = 'hebrew';
}

export default Language;
