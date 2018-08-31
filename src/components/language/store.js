import { action } from 'mobx';
import validateable from 'mobx-vm/validateable';
import ModularViewModel from 'mobx-vm/modularViewModel';

class Language extends ModularViewModel {
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
  @validateable()
  name = 'hebrew';
}

export default Language;
