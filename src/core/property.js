import {observable} from "mobx"
export default function property(settings = {}) {
    return function (target, name, descriptor) {
        let defaultValue= descriptor.value;
        let validations = settings.validations
        let isValid = true;
        let message = '';

        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;

        
        const value=observable.box(target[name])
        value.observe(function(change) {
            console.log(change.oldValue, "->", change.newValue);
        });
        descriptor.get = function() { 
            return value.get();
        };

        //todo:isRequired
   
        descriptor.set = (newValue)=> {
            value.set(newValue);
            // validate()
            // if(isValid) { value = newValue}
        //todo: public value to parent
        };

        const validate=()=>{
            // var failedValidation= validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value,item.params)=== false) )
            // if(! failedValidation){
            //     return
            // }
            // message = failedValidation.message 
            // isValid = false
        }
        const map=(value)=>{
            return typeof settings.map === 'function' ? settings.map() : value;
        }
        const reset=()=>{
            descriptor.set(defaultValue)   
        }
        const parent = target.getParent();
        parent.validations[name] = validations;
        parent.reset[name] = reset;

        return descriptor;
    }
}
