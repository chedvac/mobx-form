import PersonalInformation from "./containers/PersonalInformation/store";
import ComplexType from '../../../core/ComplexType'
import {sumAges} from './containers/PersonalInformation/validations'

class SimpleFieldsTab extends ComplexType {
    constructor(){
        super();
       
        this.userDetails = new PersonalInformation({validations: [sumAges({number:60})]})
        this.initialProperty('userDetails',this.userDetails,{validate:this.userDetails.validate,map:this.userDetails.map,reset:this.userDetails.reset})

    }
}

export default SimpleFieldsTab;


