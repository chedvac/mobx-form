import PersonalInformation from "./containers/PersonalInformation/store";
import ComplexType from '../../../core/ComplexType'

class SimpleFieldsTab extends ComplexType {
    constructor(){
        super();
       
            this.userDetails = new PersonalInformation()
            this.setProperty('userDetails',this.userDetails,{validate:this.userDetails.validate,map:this.userDetails.map,reset:this.userDetails.reset})

    }
}

export default SimpleFieldsTab;


