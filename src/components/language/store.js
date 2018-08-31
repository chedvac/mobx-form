import { action } from 'mobx';
import validateable from 'mobx-vm/validateable';
import ComplexType from 'mobx-vm/complexType';

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
