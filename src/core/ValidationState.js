import {observable, action} from 'mobx';

export default class ValidationState {
    @observable message = '';
    @observable isValid = true;
    constructor(){
        this.setIsValid = this.setIsValid.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.setValidationState = this.setValidationState.bind(this);
    }
    @action setMessage = function(message){
        this.message = message;
    }
    @action setIsValid = function(isValid){
        this.isValid = isValid;
    }
    @action setValidationState = function(ValidationState){
        const {isValid, message}= ValidationState
        this.isValid = isValid;
        this.message = message;
    }
};