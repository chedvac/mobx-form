import {observable} from "mobx"
export default function ({target, name, descriptor, validationsManager, ...params} = params) {

    var defaultValue = descriptor? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    delete descriptor.initializer;
    delete descriptor.value;
    delete descriptor.writable ;

    const value=observable.box(defaultValue);

    descriptor.set = function(newValue) {
        validate(this, newValue);
        const mappedValue = map(newValue);
        this.model[name] = mappedValue;
        value.set(mappedValue);
    };
    descriptor.get = function() { 
        return value.get();
    };

    const map=(value1)=>{
        return typeof params.map === 'function' ? params.map(value1) : value1;
    }

    const validate=(parent, newValue )=>{
        const value = newValue !== undefined ? newValue : descriptor.get();
        let feiledValidation = validationsManager.validate(value, parent.propertiesManager[name]);
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
    target.initialProperty(name, value, {value,validate, map, reset, validationsManager});
    Object.defineProperty(target, name, descriptor);
}