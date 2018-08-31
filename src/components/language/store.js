import { action } from 'mobx';
import validateable from 'core/validateable';
import ModularViewModel from 'core/modularViewModel';

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
