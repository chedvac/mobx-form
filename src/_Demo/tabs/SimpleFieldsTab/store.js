import PersonalInformation from "./containers/PersonalInformation/store";
import ComplexType from '../../../core/ComplexType'

class SimpleFieldsTab extends ComplexType {
    constructor(){
        super();
        this.model={...this.model,
            userDetails: new PersonalInformation()
        }
    }
}

export default SimpleFieldsTab;


