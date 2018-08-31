import PersonalInformation from './containers/PersonalInformation/store';

import ComplexType from 'mobx-vm/complexType';
import modelMember from 'mobx-vm/modelMember';

class SimpleFieldsTab extends ComplexType {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
  }
  @modelMember({ reset: {} })
  userDetails;
}

export default SimpleFieldsTab;
