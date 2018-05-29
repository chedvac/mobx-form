import PersonalInformation from "./containers/PersonalInformation/store";
import ComplexType from '../../../core/complexType'
import property from "../../../core/property"
class SimpleFieldsTab extends ComplexType {
    constructor(){
        super();
 
    }
    @property userDetails = new PersonalInformation()

}

export default SimpleFieldsTab;


