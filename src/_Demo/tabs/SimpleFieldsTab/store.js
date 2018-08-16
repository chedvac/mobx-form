import PersonalInformation from './containers/PersonalInformation/store';
import ComplexType from 'core/complexType';
import modelProp from 'core/modelProp';

class SimpleFieldsTab extends ComplexType {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
 
  }
  @modelProp({reset:{}}) userDetails;
 
}

export default SimpleFieldsTab;
