import PersonalInformation from "./containers/PersonalInformation/store";
import ComplexType from '../../../core/ComplexType'
import modelProp from "../../../core/modelProp"
import {initializeComplexProperties} from "../../../core/complexPropertiesRegistration";

class SimpleFieldsTab extends ComplexType {
    constructor(){
        super();
        this.userDetails = new PersonalInformation()
        initializeComplexProperties(this);
    }
    @modelProp() userDetails;
}

export default SimpleFieldsTab;


