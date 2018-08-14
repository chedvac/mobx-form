import { action } from 'mobx';
import validateableObservable from 'core/validateableObservable';
import ComplexType from 'core/ComplexType';

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
  @validateableObservable() name = 'hebrew';
}

export default Language;
