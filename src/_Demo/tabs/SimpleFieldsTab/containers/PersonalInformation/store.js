import {observable, autorun, action} from "mobx";
import {HebrewName, noHebrewLetters} from "../../../../../validations/validationsEnum"
import property from "../../../../../core/property"
import ComplexType from '../../../../../core/ComplexType'
import {generateGreaterThan} from '../../../../../validations/validationsFactory'
import { greaterThan } from "../../../../../validations/number";
import addressValidations from '../../../../../validations/address'

class PersonalInformation extends ComplexType {
    
    constructor(){
        super();
        this.condition = function(){return true}
        const self = this;
        this.model={...this.model,
            
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
             comments:'comments',
            @property
            ({validations:[]}) 
            status:2,
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
