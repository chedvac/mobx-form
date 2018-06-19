import formObservableGenerator from './formObservableGenerator'
import {modelPropGenerator} from './modelProp'

export const defineComplexTypeProperty = function({target, name, descriptor, ...settings}){
    target._properties = target._properties || {};
    target._properties[name] = target._properties[name] || {name, descriptor};
    Object.assign(target._properties[name], settings);
};

const generateModelProp = function(property, complexTypeInstance){
    if(!property.isModelProp){
        return;
    }
    modelPropGenerator({
        target: complexTypeInstance, 
        name: property.name, 
        descriptor: property.descriptor
    }); 
}
const generateFormObservable = function(property, complexTypeInstance){
    if(!property.isFormObservable){
        return;
    }
    formObservableGenerator({
        target: complexTypeInstance, 
        name: property.name, 
        descriptor: property.descriptor,  
        validationsManager: property.validationsManager
    });

};
const initializeInstance = function(complexTypeInstance){
    if (complexTypeInstance._propertiesInitialized){
        return;
    }
    const properties = complexTypeInstance._properties;
    complexTypeInstance._propertiesInitialized = true;
    for (let key in properties) {       
        generateModelProp(properties[key], complexTypeInstance);
        generateFormObservable(properties[key], complexTypeInstance);
    }
};
export default  initializeInstance;