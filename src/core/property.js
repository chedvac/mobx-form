import {observable} from "mobx"
export default function property(settings = {}) {
    return function (target, name, descriptor) {
        let defaultValue= descriptor.value;
        let validations = settings.validations
        let isValid = true;
        let message = '';
        
        const parent = target.getParent();

        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;

        const value=observable.box(target[name])
        

        descriptor.set = (newValue)=> {
            validate()
            if(isValid) { 
                const mappedValue = map(newValue);
                value.set(mappedValue);
            }        
        };

        descriptor.get = function() { 
            return value.get();
        };

        const map=(value)=>{
            return typeof settings.map === 'function' ? settings.map(value) : value;
        }

        const validate=()=>{
            // var failedValidation= validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value,item.params)=== false) )
            // if(! failedValidation){
            //     return
            // }
            // message = failedValidation.message 
            // isValid = false
        }

        const reset=()=>{
            descriptor.set(defaultValue)   
        }

        parent.propertiesManager[name] = {validations, reset, map, validate, isValid, message};
        parent[name] = descriptor;
        return descriptor;
    }
}
