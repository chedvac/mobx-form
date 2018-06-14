import {observable} from "mobx"

export default class PropertiesManager{
    @observable message
    @observable isValid
    constructor(validations=[]){
       this.message = ""
       this.isValid = true
    }
   
    push = (value) => {        
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
