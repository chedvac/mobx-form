import {observable, autorun, action,computed} from "mobx";
import property from "../../../../../core/property"
import ComplexType from '../../../../../core/ComplexType'
import {generateGreaterThan} from '../../../../../validations/validationsFactory'
import addressValidations from '../../../../../validations/address'
import {hebrewName} from '../../../../../validations/languages'
import {maxlength} from '../../../../../validations/general'
import {greaterThan} from '../../../../../validations/number'
import {sumAges} from './validations'

class PersonalInformation extends ComplexType {
  
    constructor(){
        super({validations:[sumAges({number:30})]});
        this.firstName = ' ';
        this.status = '';
        this.agreement = '';
        this.comments = '';
        this.fatherAge = 45;
        this.age = 15;
        this.lastName = ' ';

        this.propertiesManager.fatherAge.validationsManager.validations.push(greaterThan({number1:()=>this.age}))

        this.condition = function(){return true}

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

    @property({  validations:[hebrewName(), maxlength({value: 5})],}) firstName;
    @property ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) lastName ;
    @property({ validations: [addressValidations.houseNumber({codition:this.condition}),],}) age;
    
    @property ({validations:[]}) fatherAge;
    @property ({validations:[]}) comments;
    @property ({validations:[]}) status;
    @property ({validations:[]}) agreement;
}
export default PersonalInformation;
