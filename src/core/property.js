
import {observable} from "mobx";

export default function property(settings = {}) {
    return function (target, name, descriptor) {
        let value = descriptor.value;
        let defaultValue= descriptor.value;
        let validations = settings.validations
        let isValid = true;
        let message = '';
        
        const parent = target.getParent();

        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;
  
        descriptor.set = (newValue)=> {
            validate()
            if(isValid) { value = map(newValue)}        
        };

        descriptor.get = function() { 
            return value;
        };

        const map=(value)=>{
            return typeof settings.map === 'function' ? settings.map(value) : value;
        }

        const validate=()=>{
            var failedValidation= validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value,item.params)=== false) )
            if(! failedValidation){
                return
            }
            message = failedValidation.message 
            isValid = false
        }

        const reset=()=>{
            descriptor.set(defaultValue)   
        }

        parent.propertiesManager[name] = {validations, reset, map, validate, isValid, message};
        parent[name] = descriptor;
        return descriptor;
    }
}
