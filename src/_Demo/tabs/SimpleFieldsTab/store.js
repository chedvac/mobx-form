import PersonalInformation from './containers/PersonalInformation/store';
import ComplexType from 'mobx-vm/complexType';
import modelProp from 'mobx-vm/modelProp';

class SimpleFieldsTab extends ComplexType {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
 
  }
  @modelProp({reset:{}}) userDetails;
 
}

export default SimpleFieldsTab;
