import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"
export default function property(settings = {}) {
    return function (target, name, descriptor) {

        let defaultValue= descriptor.value;
         
        const validationsManager = new validationsManagerFactory(settings.validations);

        
        // const parent = target.getParent();

        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;

        const value=observable.box(target[name])
        

        descriptor.set = function(newValue) {
            let feiledValidation = validate(newValue)
            if(!this.propertiesManager[name]){
                this.propertiesManager[name]={};
            }
            if(!feiledValidation.isValid){
                this.propertiesManager[name].isValid = false
                this.propertiesManager[name].message = feiledValidation.message;
            }
            else{
                this.propertiesManager[name].isValid = true
                this.propertiesManager[name].message = '';
            }


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
            return validationsManager.validate(newValue)
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

        // parent.propertiesManager[name] = {validationsManager, reset, map};
        // parent[name] = descriptor;

        return descriptor;
    }
}
