import {observable} from "mobx"
export default function ({target, name, descriptor, validationsManager, ...params} = params) {

    var defaultValue = descriptor? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    delete descriptor.initializer;
    delete descriptor.value;
    delete descriptor.writable ;

    const value=observable.box(defaultValue);

    descriptor.set = function(newValue, parent) {
        value.set(newValue);
        validate(parent ? parent : this, newValue);
        //const mappedValue = map(newValue);
        // this.model[name] = newValue;
        
    };

    descriptor.get = function() { 
        return value.get();
    };

    const validate=(parent, newValue )=>{
        const value = newValue !== undefined ? newValue : descriptor.get();
        let feiledValidation = validationsManager.validate(value, parent.propertiesManager.properties[name], parent);
        if(!feiledValidation.isValid){
            parent.propertiesManager.properties[name].isValid = false
            parent.propertiesManager.properties[name].message = feiledValidation.message;
        }
        else{
            parent.propertiesManager.properties[name].isValid = true
            parent.propertiesManager.properties[name].message = '';
        }
        return feiledValidation.isValid;
    }
    target.initialProperty(name, {validate, validationsManager, ref: descriptor});

    Object.defineProperty(target, name, descriptor);
}