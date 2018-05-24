import {observable, autorun, action} from "mobx";
import {HebrewName,require} from "../../validations/validationsEnum"
import property from "../../core/property"
import complexType from "../../core/complexType"

@complexType({validations:[]})
class PersonalInformation {
    
    constructor(){
        this.condition = function(){return true}
        this.validations = {};
        this.reset = {};
         const self =this
        this.model={
            getParent: function(){return self},
            @observable age:"",
            @property
            ({ 
              validations:[{rule:HebrewName,condition:this.condition, params:{}}],
               map: function(){}
            }) firstName: undefined
        }
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
    
}
export default PersonalInformation;
