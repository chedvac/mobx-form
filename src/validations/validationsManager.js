import {observable} from "mobx"

export default class validationsManager{
    failedValidation = {};
    @observable isValid= true; 
    @observable message= '';
    flattenDeep = (arr1) =>{
        return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val), []);
     };
    constructor(validations){
        this.validations= this.flattenDeep(validations);
    }
    getMessage = () => {
    return this.failedValidation ? this.failedValidation.message : '';
    }
    validate = (value) => {        
        this.failedValidation = this.validations.find(
            item =>
                !item.validator(value)
            
        )
        if(this.failedValidation)
        {
            this.message = this.getMessage();  
            this.isValid = false;
            return false;
        }
        this.message = '';  
        this.isValid = true;
        return true;
        
    }
}
