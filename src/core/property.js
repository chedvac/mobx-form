import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"
export default function property(settings = {}) {
    return function (target, name, descriptor) {
        let defaultValue= descriptor.value;
         
        const validationsManager = new validationsManagerFactory(settings.validations);

        
        const parent = target.getParent();

        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;

        const value=observable.box(target[name])
        

        descriptor.set = (newValue)=> {
            validate(newValue)
            const mappedValue = map(newValue);
            value.set(mappedValue);
        };

        descriptor.get = function() { 
            return value.get();
        };

        const map=(value)=>{
            return typeof settings.map === 'function' ? settings.map(value) : value;
        }

        const validate=(newValue)=>{
            validationsManager.validate(newValue)
            //TODO validate with pure function
            // var failedValidation= validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(newValue,item.params)=== false) )
            // if(! failedValidation){
            //     return
            // }
            // parent.propertiesManager[name].message = failedValidation.rule.message
            // parent.propertiesManager[name].isValid = false
        }

        const reset=()=>{
            descriptor.set(defaultValue)   
        }

        parent.propertiesManager[name] = {validationsManager, reset, map, validate};
        parent[name] = descriptor;
        return descriptor;
    }
}
