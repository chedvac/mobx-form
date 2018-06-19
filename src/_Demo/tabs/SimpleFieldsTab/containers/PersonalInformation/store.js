import {observable, autorun, action,computed} from "mobx";
import formObservable from "../../../../../core/formObservable"
import modelProp from "../../../../../core/modelProp"

import ComplexType from '../../../../../core/ComplexType'
import addressValidations from '../../../../../validations/address'
import {hebrewName} from '../../../../../validations/languages'
import {maxlength} from '../../../../../validations/general'
import {greaterThan, lessThan} from '../../../../../validations/number'
import {sumAges} from './validations'
import validationFactory from './../../../../../validations/validationsFactory'
import { request } from "http";
import axios from 'axios'

const myRequest = function(value) {
    return axios.get("http://gov.forms.local/MW/File//", {params: {ID: value}}).then((res)=>{
        if(res && res.data.statusCode === 0){
            return true;
        }
        throw({error: "async validaion failed"});
    })
}

class PersonalInformation extends ComplexType {
    validations= [sumAges({number:60})]

    constructor(){
        super();
        this.propertiesManager.properties.fatherAge.validationsManager.validations.push(greaterThan({number1: this.propertiesManager.properties.age.ref}))
        this.propertiesManager.properties.age.validationsManager.validations.push(lessThan({number1: this.propertiesManager.properties.fatherAge.ref}))
        this.condition = function(){return true}
        this.set_firstName = this.set_firstName.bind(this);
        this.set_lastName = this.set_lastName.bind(this);
        this.set_fatherAge = this.set_fatherAge.bind(this);
        this.set_age = this.set_age.bind(this);
        this.set_comments = this.set_comments.bind(this);
        this.set_status = this.set_status.bind(this);
        this.set_agreement = this.set_agreement.bind(this);
        this.set_city = this.set_city.bind(this);
        this.set_birthDate = this.set_birthDate.bind(this);
    }
    @modelProp() @formObservable ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) firstName = '';
    @modelProp() @formObservable ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) fdsfds = '';

    @modelProp() @formObservable ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) lastName = '';
    @modelProp() @formObservable({ validations: [addressValidations.houseNumber({codition:this.condition}),],}) age = 15 ;
    @modelProp() @formObservable ({validations:[greaterThan({number: 10})]}) fatherAge = 0;
    @modelProp() @formObservable ({validations:[]}) comments = '';
    @modelProp() @formObservable ({validations:[]}) status = 'true';
    @modelProp() @formObservable ({validations:[]}) agreement = "";
    @modelProp() @formObservable ({validations:[]}) city = "";
    @modelProp() @formObservable ({validations:[]}) birthDate = "";
    
    // #region actions 
    @action
    set_firstName(value){
        this.firstName=value;
    }
    @action
    set_city(value){
        this.city=value;
    }  
    @action
    set_birthDate(value){
        this.birthDate=value;
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
