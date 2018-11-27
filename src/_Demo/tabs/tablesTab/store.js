import { action, observable } from 'mobx';
import validateable from 'mobx-vm/validateable';
import modelMember from 'mobx-vm/modelMember';
import PersonalInformation from '_Demo/tabs/SimpleFieldsTab//containers/PersonalInformation/store';
// import PersonalInformation from './containers/PersonalInformation/PersonalInformation/store';

import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';

import ModularViewModel from 'mobx-vm/modularViewModel';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';

class TablesTab extends ModularViewModel {
  constructor() {
    super();
    // this.email = "yaelp@gov.il"
    this.setEmail = this.setEmail.bind(this);
    this.setHouseNumber = this.setHouseNumber.bind(this);
    this.addUser.bind(this);
    this.addUser();
    this.addUser();

    // this.addUser.bind(this);
  }
  @modelMember()
  @validateable({ validations: [hebrew(), maxlength({ value: 5 })] })
  email = '';
  @modelMember()
  @validateable()
  houseNumber = '';
  @action
  setEmail(value) {
    this.email = value;
  }
  @action
  setHouseNumber(value) {
    this.houseNumber = value;
  }

  @observable
  //@modelMember()
  //@validateable({ validations: [] })
  users = [];
  @action.bound
  addUser() {
    this.users.push(new PersonalInformation());
  }
}

TablesTab.propTypes = {
  users: PropTypes.arrayOf(PersonalInformation)
};
export default TablesTab;
