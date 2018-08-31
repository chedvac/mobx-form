import PersonalInformation from './containers/PersonalInformation/store';
import ModularViewModel from 'core/modularViewModel';
import modelMember from 'core/modelMember';

class SimpleFieldsTab extends ModularViewModel {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
  }
  @modelMember({ reset: {} })
  userDetails;
}

export default SimpleFieldsTab;
