import {observable, autorun, action,computed} from "mobx";
import property from "../../../../../core/property"
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

        this.condition = function(){return true}

        this.set_firstName = this.set_firstName.bind(this);
        this.set_lastName = this.set_lastName.bind(this);
        this.set_fatherAge = this.set_fatherAge.bind(this);
        this.set_age = this.set_age.bind(this);
        this.set_comments = this.set_comments.bind(this);
        this.set_status = this.set_status.bind(this);
        this.set_agreement = this.set_agreement.bind(this);

        this.propertiesManager.fatherAge.validationsManager.validations.push(greaterThan({number1: this.propertiesManager.age.value}))
        this.propertiesManager.age.validationsManager.validations.push(lessThan({number1: this.propertiesManager.fatherAge.value}))
    }

    @property ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) firstName = '';
    @property ({validations:[hebrewName({message: 'hebrew only'}), maxlength({value: 15, message: 'too long...'})],}) lastName = '';
    @property({ validations: [addressValidations.houseNumber({codition:this.codition}),],}) age = 15 ;
    @property ({validations:[greaterThan({number: 10})]}) fatherAge = 0;
    @property ({validations:[validationFactory.generateAsyncValidation({name: 'tryAsyncValidation', message: 'my default error', request: myRequest})]}) comments = '';
    @property ({validations:[]}) status = 'true';
    @property ({validations:[]}) agreement = "";

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
