import formObservableGenerator from './formObservableGenerator';
import { modelPropGenerator } from './modelProp';
import ComplexType from './ComplexType';

const generateModelProp = function(property, complexTypeInstance) {
  if (!property.isModelProp) {
    return;
  }
  modelPropGenerator({
    target: complexTypeInstance,
    name: property.name,
    descriptor: property.descriptor,
    isFormObservable: property.isFormObservable
  });
};
const generateFormObservable = function(property, complexTypeInstance) {
  if (!property.isFormObservable) {
    return;
  }
  formObservableGenerator({
    target: complexTypeInstance,
    name: property.name,
    descriptor: property.descriptor,
    validationsManager: property.validationsManager
  });
};

export const initializeProperties = function(complexTypeInstance, properties) {
  if (complexTypeInstance._propertiesInitialized) {
    return;
  }
  complexTypeInstance._propertiesInitialized = true;
  for (const key in properties) {
    complexTypeInstance.propertiesManager.createProperty(key);
    generateModelProp(properties[key], complexTypeInstance);
    generateFormObservable(properties[key], complexTypeInstance);
  }
};

export const initializeComplexProperties = function(parent) {
  for (const key in parent._properties) {
    const property = parent[key];
    if (property instanceof ComplexType) {
      parent.propertiesManager.setComplexProperty(key, {
        validate: property.validate
      });
    }
  }
};
