import {concatArray} from './utils'

export default class validationsManager{
    failedValidation = {};

    constructor(validations){
        this.validations= concatArray(validations);
    }
    
    validate = (value, observable, parent) => {
        this.failedValidation = this.validations.find(
            item =>{
               return !item.validator(value, observable, parent)
            }
        )
        return  {
            message: this.failedValidation ? this.failedValidation.message() : '', 
            isValid: this.failedValidation ? false : true
        }
        
    }
}
