import {observable, autorun, action} from "mobx";
import property from "../../../../../core/property"
import ComplexType from '../../../../../core/complexType'
import {generateGreaterThan} from '../../../../../validations/validationsFactory'
import addressValidations from '../../../../../validations/address'
import {hebrewName} from '../../../../../validations/languages'
import {maxlength} from '../../../../../validations/general'
import {greaterThan} from '../../../../../validations/number'

class PersonalInformation extends ComplexType {
    constructor(){
        super();
        this.condition = function(){return true}

        const self = this;

        this.views = {//todo: rename , computed
            fullName :()=>{
                return this.firstName + this.lastName
            }
        }
        this.actions = {
            @action
            set_firstName:(value)=>{
                this.firstName=value;
            },
            @action
            set_lastName:(value)=>{
                this.lastName=value;
            },
            @action
            set_fatherAge:(value)=>{
                this.fatherAge=value;
            },
            @action
            set_age:(value)=>{
                this.age=value;
            },
            @action
            set_comments:(value)=>{
                this.comments=value;
            },
            @action
            set_status:(value)=>{
                this.status=value;
            },
            @action
            set_agreement:(value)=>{
                this.agreement=value;
            }
        }
        this.volatile={
          
        }

    }
    @property
    ({ 
     validations:[hebrewName(), maxlength({value: 5})],
    }) 
    firstName: 'Yossef';

    @property
    ({ 
      validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],
    }) 
    lastName : 'Levi';

    @property
    ({ 

      validations: [addressValidations.houseNumber({codition:this.condition}),],
    }) 
     age:15;
    
    @property
    ({
        validations:[greaterThan({number: 10})]
    }) 
    fatherAge: 35;
    @property
    ({validations:[]})
     comments:undefined;
    @property
    ({validations:[]}) 
    status:undefined;
    @property
    ({validations:[]}) 
    agreement:false;
}

export default PersonalInformation;
