
export default function property(settings = {}) {
    return function (target, name, descriptor) {
        let value = descriptor.value;
        let defaultValue= descriptor.value;
        let validations = settings.validations
        let isValid = true;
        let message = '';

        delete descriptor.initializer;
        delete descriptor.value;
        delete descriptor.writable ;

  
       
        descriptor.get = function() { 
            return value;
        };

        //todo:isRequired
   
        descriptor.set = (newValue)=> {
            validate()
            if(isValid) { value = newValue}
        //todo: public value to parent
        };

        const validate=()=>{
            var failedValidation= validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value,item.params)=== false) )
            if(! failedValidation){
                return
            }
            message = failedValidation.message 
            isValid = false
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
