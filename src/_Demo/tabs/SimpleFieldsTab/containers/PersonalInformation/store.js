import {observable, autorun, action} from "mobx";
import property from "../../../../../core/property"
import ComplexType from '../../../../../core/ComplexType'
import {generateGreaterThan} from '../../../../../validations/validationsFactory'
import addressValidations from '../../../../../validations/address'
import {hebrewName} from '../../../../../validations/languages'
import {maxlength} from '../../../../../validations/general'
import {greaterThan} from '../../../../../validations/number'

class PersonalInformation extends ComplexType {
    constructor(){
        super();

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
    @property ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) lastName = '';
    @property({ validations: [addressValidations.houseNumber({codition:this.condition}),],}) age = 15 ;
    @property ({validations:[greaterThan({number: 10})]}) fatherAge = 0;
    @property ({validations:[]}) comments = '';
    @property ({validations:[]}) status = true;
    @property ({validations:[]}) agreement = "";
}
export default PersonalInformation;
