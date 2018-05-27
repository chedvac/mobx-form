import {observable, autorun, action} from "mobx";
import {HebrewName,require} from "../../../../../validations/validationsEnum"
import property from "../../../../../core/property"
import complexType from '../../../../../core/complexType'
//"../../core/complexType"

@complexType()
class PersonalInformation {
    
    constructor(){
        this.condition = function(){return true}
        const self = this;
        this.model={
            getParent: function(){return self},
            @property
            ({ 
              validations:[{rule:HebrewName}]
            }) @observable age: undefined,
            @property
            ({ 
              validations:[{rule:HebrewName,condition:this.condition, params:{}}],
               map: function(){}
            }) @observable firstName: undefined
        }

    }
    
}
export default PersonalInformation;