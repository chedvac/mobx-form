import {observable, autorun, action} from "mobx";
import {HebrewName,require} from "../../../../../validations/validationsEnum"
import property from "../../../../../core/property"
import complexType from '../../../../../core/complexType'
//"../../core/complexType"

@complexType({validations:[]})
class PersonalInformation {
    
    constructor(){
        this.condition = function(){return true}
        this.validations = {};
        this.reset = {};
         const self =this
        this.model={
            getParent: function(){return self},
            @property
            ({ 
              validations:[{rule:HebrewName,condition:this.condition, params:{}}],
            }) 
            firstName: 'Yossef',
            @property
            ({ 
              validations:[{rule:HebrewName,condition:this.condition, params:{}}],
            }) 
            lastName : 'Levi',
            @property
            ({ 
              validations:[{rule:HebrewName,condition:this.condition, params:{}}],
            }) 
            @property age:15,
            @property
            ({ 
              validations:[{rule:HebrewName,condition:this.condition, params:{}}],
            }) 
            @property fatherAge:35,
            @property comments:undefined,
            @property status:undefined,
            @property agreement:false,
        }
        
        this.views = {//todo: rename , computed
            fullName :()=>{
                return this.firstName + this.lastName
            }
        }
        this.actions = {
        @action
        set_firstName:(value)=>{
            this.model.firstName=value;
        },
        @action
        set_lastName:(value)=>{
            this.model.lastName=value;
        },
        @action
        set_fatherAge:(value)=>{
            this.model.fatherAge=value;
        },
        @action
        set_age:(value)=>{
            this.model.age=value;
        },
        @action
        set_comments:(value)=>{
            this.model.comments=value;
        },
        @action
        set_status:(value)=>{
            this.model.status=value;
        },
        @action
        set_agreement:(value)=>{
            this.model.agreement=value;
        }
        }
        this.volatile={

        }
    }
    
}
export default PersonalInformation;
