import { observable, action } from 'mobx';
import validateable from 'mobx-vm/validateable';
import ModularViewModel from 'mobx-vm/modularViewModel';
import modelMember from 'mobx-vm/modelMember';
import ListUsers from '../SimpleFieldsTab/store';

class Tab3 extends ModularViewModel {
  constructor(settings) {
    super(settings);
  }

  @observable
  @modelMember({
    map: {
      serverMap: {
        key: 'age',
        from: data => ({
          firstName: data.name,
          age: data.code
        }),
        to: data => ({
          listUsers_users: data.users
        })
      }
    }
  })
  @validateable({
    validations: []
  })
  listUsers = [];

  @action
  addListUsers() {
    const item = new ListUsers();
    this.listUsers.push(item);
    return item;
  }
}

export default Tab3;
