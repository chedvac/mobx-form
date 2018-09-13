import { observable, action } from 'mobx';
import validateable from 'mobx-vm/validateable';
import modelMember from 'mobx-vm/modelMember';

class EntityBase extends ComplexType {
  constructor() {
    super();

    this.set_EntityBase = this.set_EntityBase.bind(this);
  }
  @observable
  @modelMember()
  @validateable()
  key = '';

  @observable
  @modelMember()
  @validateable()
  value = '';

  @action
  set_EntityBase(item) {
    if (item) {
      this.key = item.key;
      this.value = item.value;
    } else {
      this.key = '';
      this.value = '';
    }
  }
}

export default EntityBase;

// decoterors or type
// key & value should be in schema and need validations
// required
// map
// how to update the second (before mapping, computed etc..)

city;
