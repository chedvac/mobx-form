import PersonalInformation from './containers/PersonalInformation/store';
import ModularViewModel from 'mobx-vm/modularViewModel';
import modelMember from 'mobx-vm/modelMember';

class SimpleFieldsTab extends ModularViewModel {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
  }
  @modelMember({ reset: {} })
  userDetails;
}

export default SimpleFieldsTab;
