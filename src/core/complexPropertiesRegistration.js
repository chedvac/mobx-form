import formObservableGenerator from './formObservableGenerator';
import { modelPropGenerator } from './modelProp';
import ComplexType from './ComplexType';

const generateModelProp = function(property, complexTypeInstance) {
  if (!property.isModelProp) {
    return;
  }
  //todo add check if it complex or isformobservable
  complexTypeInstance.modelPropsManager.createProperty(
    property.name
  );

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
  complexTypeInstance.formObservablesManager.createProperty(
    property.name
  );

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
    generateModelProp(properties[key], complexTypeInstance);
    generateFormObservable(properties[key], complexTypeInstance);
  }
};

export const initializeComplexProperties = function(parent) {
  for (const key in parent._properties) {
    const property = parent[key];
    if (property instanceof ComplexType) {
      parent.modelPropsManager.setComplexProperty(key, {
        ref: parent[key]
      });
    }
  }
};
