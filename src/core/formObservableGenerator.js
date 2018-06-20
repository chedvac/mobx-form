import {observable} from "mobx"
export default function ({target, name, descriptor, validationsManager, ...params} = params) {

    var defaultValue = descriptor? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    delete descriptor.initializer;
    delete descriptor.value;
    delete descriptor.writable ;

    const value=observable.box(defaultValue);

    descriptor.set = function(newValue) {
        validate(this, newValue);
        //const mappedValue = map(newValue);
        value.set(newValue);
    };

    descriptor.get = function() { 
        return value.get();
    };

    const validate = (parent, newValue )=>{
        const value = newValue !== undefined ? newValue : descriptor.get();
        let feiledValidation = validationsManager.validate(value, parent.propertiesManager.properties[name]);
        Object.assign(parent.propertiesManager.properties[name], feiledValidation);
        return feiledValidation.isValid;
    }
    target.initialProperty(name, {validate, validationsManager, ref: value});

    Object.defineProperty(target, name, descriptor);
}