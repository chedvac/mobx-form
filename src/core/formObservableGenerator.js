import {observable,reaction} from "mobx"
export default function ({target, name, descriptor, validationsManager, ...params} = params) {

    var defaultValue = descriptor? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    delete descriptor.initializer;
    delete descriptor.value;
    delete descriptor.writable ;

    const observableBox =observable.box(defaultValue,{name});

    observableBox.intercept(function(change) {
      validate(target,change.newValue)
      return change;
    });
   
    observableBox.observe(function(){
        const dependedObservables=target.propertiesManager.properties[name].dependedObservables;
        if(!dependedObservables){
            return;
        }
        for (const observable in dependedObservables){
            target.propertiesManager.properties[observable].validate(target,target[observable])
          }
    });

    descriptor.set = function(newValue) {
        observableBox.set(newValue);
    };

    descriptor.get = function() { 
        return observableBox.get();
    };

    const validate = (parent, newValue )=>{
        const value = newValue !== undefined ? newValue : descriptor.get();
        let feiledValidation = validationsManager.validate(value, parent.propertiesManager.properties[name]);
        Object.assign(parent.propertiesManager.properties[name], feiledValidation);
        return feiledValidation.isValid;
    }
    target.propertiesManager.setFormObservableProperty(name, {validate, validationsManager, ref: observableBox});

    Object.defineProperty(target, name, descriptor);
}