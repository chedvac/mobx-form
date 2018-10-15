import { observable, action } from 'mobx';
import validateable from 'mobx-vm/validateable';
import PersonalInformation from './containers/PersonalInformation/store';
import ModularViewModel from 'mobx-vm/modularViewModel';
import modelMember from 'mobx-vm/modelMember';

class SimpleFieldsTab extends ModularViewModel {
  constructor(settings) {
    super(settings);

    const map = {
      serverMap: {
        from: data => ({
          firstName: data.name,
          ...data
        }),
        to: userDetails => ({
          name: userDetails.firstName,
          family: userDetails.lastName
        })
      },
      externalMap: {
        // from: data => ({
        //   firstName: data.name,
        //   ...data
        // }),
        to: userDetails => ({
          name: userDetails.firstName,
          family: userDetails.lastName
        })
      }
    };

    this.userDetails = new PersonalInformation({ map });
    this.addUsers();
  }
  @modelMember({ reset: {} })
  userDetails = PersonalInformation;

  @observable
  @modelMember({
    map: {
      serverMap: {
        key: 'age',
        from: data => ({
          firstName: data.name,
          age: data.code
        }),
        to: userDetails => ({
          nameArray: userDetails.firstName,
          familyArray: userDetails.lastName
        })
      },
      loadList: {
        from: data => ({
          firstName: data.name,
          ...data
        })
      }
    },
    resetIgnor: true
  })
  @validateable({
    validations: []
  })
  users = [];

  @action.bound
  mapUsers(data, mappingType) {
    this.mapArray('users', data, mappingType);
  }

  @action.bound
  addUsers() {
    //todo rename
    // const settings = {
    //   map: {
    //     from: data => ({
    //       firstName: data.name,
    //       ...data
    //     }),
    //     to: userDetails => ({
    //       nameArray: userDetails.firstName,
    //       familyArray: userDetails.lastName
    //     })
    //   },
    //   reset: {}
    // };
    //setting from model member array
    //const settings=addMap
    const item = new PersonalInformation();
    this.users.push(item);
    return item;
  }
}

export default SimpleFieldsTab;
