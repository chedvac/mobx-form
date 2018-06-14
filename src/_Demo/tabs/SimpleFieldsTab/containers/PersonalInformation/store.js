import {observable, autorun, action,computed} from "mobx";
import property from "../../../../../core/property"
import ComplexType from '../../../../../core/ComplexType'
import {generateGreaterThan} from '../../../../../validations/validationsFactory'
import addressValidations from '../../../../../validations/address'
import {hebrewName} from '../../../../../validations/languages'
import {maxlength} from '../../../../../validations/general'
import {greaterThan} from '../../../../../validations/number'


class PersonalInformation extends ComplexType {
    
    constructor(settings){
        super(settings);
        this.firstName = ' ';
        this.status = '';
        this.agreement = '';
        this.comments = '';
        this.fatherAge = 45;
        this.age = 15;
        this.lastName = ' ';

        this.propertiesManager.fatherAge.validationsManager.validations.push(greaterThan({number1:()=>this.age}))

        this.condition = function(){return true}

        this.set_firstName = this.set_firstName.bind(this);
        this.set_lastName = this.set_lastName.bind(this);
        this.set_fatherAge = this.set_fatherAge.bind(this);
        this.set_age = this.set_age.bind(this);
        this.set_comments = this.set_comments.bind(this);
        this.set_status = this.set_status.bind(this);
        this.set_agreement = this.set_agreement.bind(this);
        
    }
   
     // #region properties 
     @property({  validations:[hebrewName(), maxlength({value: 5})],}) firstName;
     @property ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) lastName ;
     @property({ validations: [addressValidations.houseNumber({codition:this.condition}),],}) age;
     @property ({validations:[]}) fatherAge;
     @property ({validations:[]}) comments;
     @property ({validations:[]}) status;
     @property ({validations:[]}) agreement;
    //#endregion properties 

    // #region actions 
    @action
    set_firstName(value){
        this.firstName=value;
    }
    @action
    set_lastName(value){
        this.lastName=value;
    }
    @action
    set_fatherAge(value){
        this.fatherAge=value;
    }
    @action
    set_age(value){
        this.age=value;
    }
    @action
    set_comments(value){
        this.comments=value;
    }
    @action
    set_status(value){
        this.status=value;
    }
    @action
    set_agreement(value){
        this.agreement=value;
    }
    //#endregion actions

    // #region computeds 
    @computed
    fullName(){
        return this.firstName + this.lastName
    }        
    //#endregion computeds  
   
}
export default PersonalInformation;
