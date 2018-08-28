import PersonalInformation from './containers/PersonalInformation/store';
import ComplexType from 'core/complexType';
import modelMember from 'core/modelMember';

class SimpleFieldsTab extends ComplexType {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
 
  }
  @modelMember({reset:{}}) userDetails;
 
}

export default SimpleFieldsTab;
