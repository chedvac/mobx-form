import {observable, autorun, action} from "mobx";
import {HebrewName,require} from "../../validations/validationsEnum"
import property from "../../core/property"
import complexType from "../../core/complexType"

//@complexType({validations:[]})
class PersonalInformation {
    constructor(){
       
        
        
        
        /*this.model={
            @observable age:"",
            @property({validations:[{rule:HebrewName,condition:condition, params:{lastName:lastName}}],defaultValue:""})  firstName:"",
}*/
        this.views = {//todo: rename , computed
            fullName :()=>{
                return this.firstName + this.lastName
            }
        }
        this.actions = {
          
        }
        this.volatile={

        }
    }
   // @observable lastName =""
    condition = function(){return true}
        @property({validations:[{rule:HebrewName}],defaultValue:""})  
        firstName='';
    
}
export default PersonalInformation;
