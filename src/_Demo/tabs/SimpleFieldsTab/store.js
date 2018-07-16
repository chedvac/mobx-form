import PersonalInformation from './containers/PersonalInformation/store';
import ComplexType from 'core/ComplexType';
import modelProp from 'core/modelProp';

class SimpleFieldsTab extends ComplexType {
  constructor() {
    super();
    this.userDetails = new PersonalInformation();
    this.initializeComplexProperties();
  }
  @modelProp() userDetails;
}

export default SimpleFieldsTab;
