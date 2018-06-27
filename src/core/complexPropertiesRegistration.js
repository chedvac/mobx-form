import formObservableGenerator from './formObservableGenerator'
import {modelPropGenerator} from './modelProp'
import PropertiesManager from './PropertiesManager';
import ComplexType from './ComplexType';

const generateModelProp = function(property, complexTypeInstance){
    if(!property.isModelProp){
        return;
    }
    modelPropGenerator({
        target: complexTypeInstance, 
        name: property.name, 
        descriptor: property.descriptor,
        isFormObservable: property.isFormObservable,
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

export const initializeProperties = function(complexTypeInstance){
    if (complexTypeInstance._propertiesInitialized){
        return;
    }
    const properties = complexTypeInstance._properties;
    complexTypeInstance._propertiesInitialized = true;
    for (let key in properties) { 
        complexTypeInstance.propertiesManager.createProperty(key);
        generateModelProp(properties[key], complexTypeInstance);
        generateFormObservable(properties[key], complexTypeInstance);
    }
};

export const registerProperty = function({target, name, descriptor, ...settings}){
    if(!target || !name || !descriptor){
        throw('registerProperty faile: missing require parameter: target, descriptor or name');
    }
    //TODO check is target instance of complextype ?
    target._properties = target._properties || {};
    target._properties[name] = target._properties[name] || {name, descriptor};
    Object.assign(target._properties[name], settings);
};

export const  initializeComplexProperties = function(parent){
    for (let key in parent._properties) {  
        let property = parent[key];
        if(property instanceof ComplexType){
            parent.propertiesManager.setComplexProperty(key, {validate: property.validate})
        }
    }
}
