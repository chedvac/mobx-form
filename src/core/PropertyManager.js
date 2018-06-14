import {observable} from "mobx"

export default class PropertyManager{
    
    constructor(validations=[]){
        @observable message: "",
        @observable isValid: ""
    }
    getMessage = () => {
    return this.failedValidation ? this.failedValidation.message : '';
    }
    validate = (value) => {        
        this.failedValidation = this.validations.find(
            item =>
                !item.validator(value)
        )
        return  {
            message: this.failedValidation ? this.getMessage() : '', 
            isValid: this.failedValidation ? false : true
        }
        
    }
}
