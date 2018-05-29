import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"
export default function property(settings = {}) {
    return function (target, name, descriptor) {

        let defaultValue= descriptor.value;
         
        const validationsManager = new validationsManagerFactory(settings.validations || []);
  
        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;

        const value=observable.box(target[name]);
        // target.setpropertiesActions(name, validate)

        descriptor.set = function(newValue) {
            if(!this.model[name] ){
                this.setProperty(name, newValue, {validate, map, reset, validationsManager});
            }
            validate(this, newValue);
            const mappedValue = map(newValue);
            value.set(mappedValue);
        };
        descriptor.get = function() { 
            return value.get();
        };

        const map=(value)=>{
            return typeof settings.map === 'function' ? settings.map(value) : value;
        }

        const validate=(parent, newValue )=>{
            const value = newValue ? newValue : descriptor.get();
            let feiledValidation = validationsManager.validate(value);
            if(!feiledValidation.isValid){
                parent.propertiesManager[name].isValid = false
                parent.propertiesManager[name].message = feiledValidation.message;
            }
            else{
                parent.propertiesManager[name].isValid = true
                parent.propertiesManager[name].message = '';
            }
            return feiledValidation.isValid;
        }

        const reset=()=>{
            descriptor.set(defaultValue)   
        }
        return descriptor;
    }
}
