import PersonalInformation from "./containers/PersonalInformation/store";
import ComplexType from '../../../core/ComplexType'
import modelProp from "../../../core/modelProp"
import {registerComplexProperties} from "../../../core/initializeComplexType";

class SimpleFieldsTab extends ComplexType {
    constructor(){
        super();
        this.userDetails = new PersonalInformation()
        registerComplexProperties(this);
    }
    @modelProp() userDetails;
}

export default SimpleFieldsTab;


