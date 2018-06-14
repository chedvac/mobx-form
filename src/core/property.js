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
                this.initialProperty(name, newValue, {validate, map, reset, validationsManager});
            }
            validate(this, newValue);
            const mappedValue = map(newValue);
            this.model[name] = mappedValue;
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
            let validationResult = validationsManager.validate(value);
            parent.propertiesManager[name].isValid = validationResult.isValid
            parent.propertiesManager[name].message = validationResult.message;
            
            return validationResult.isValid;
            
        }

        const reset=()=>{
            descriptor.set(defaultValue)   
        }
        return descriptor;
    }
}
// var self = this;
// const validateChildren = () => {

//     let childrenValid = true;
//     const propertiesManager = self.propertiesManager
//     if(propertiesManager){
//         Object.keys(propertiesManager).forEach(function (key) {
//             if (!propertiesManager[key].validate(self)) {
//                 console.log(key, 'not valid')
//                 childrenValid = false
//             }
//         })
//     }
//     return childrenValid
// }

// let validationResult = validationsManager.validate(newValue);
// parent.propertiesManager[name].message = validationResult.message
// parent.propertiesManager[name].isValid = validationResult.isValid
    
// validateChildren() ? this.isValid = this.isValid : this.isValid = false;

// return this.isValid