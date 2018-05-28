import {observable, autorun, action} from "mobx";
import {HebrewName, noHebrewLetters} from "../../../../../validations/validationsEnum"
import property from "../../../../../core/property"
import complexType from '../../../../../core/complexType'
import {generateGreaterThan} from '../../../../../validations/validationsFactory'
import { greaterThan } from "../../../../../validations/number";
import addressValidations from '../../../../../validations/address'

@complexType()
class PersonalInformation {
    
    constructor(){
        this.condition = function(){return true}
        const self = this;
        this.model={
            getParent: function(){return self},
            
            @property
            ({ 
             validations:[],
            }) 
            firstName: 'Yossef',

            @property
            ({ 
              validations:[addressValidations.houseNumber({message: 'not valid'})],
            }) 
            lastName : 'Levi',

            @property
            ({ 

              validations: [addressValidations.houseNumber({codition:this.condition}),],
            }) 
             age:15,
            
            @property
            ({validations:[]}) 
            fatherAge: 35,
            @property
            ({validations:[]})
             comments:undefined,
            @property
            ({validations:[]}) 
            status:undefined,
            @property
            ({validations:[]}) 
            agreement:false,
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
