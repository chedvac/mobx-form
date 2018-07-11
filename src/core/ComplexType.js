import validationsManagerFactory from 'validations/core/validationsManager';
import FormObservablesManager from './propertiesManager/FormObservablesManager';
import ModelPropsManager from './propertiesManager/ModelPropsManager';
import ValidationState from 'core/ValidationState';
import fail from './exeptions';
import formObservableGenerator from './formObservableGenerator';
import { modelPropGenerator } from './modelProp';
import fp from 'lodash/fp';
export default class ComplexType {
  constructor(settings = {}) {
    this.initializeComplexProperties = this.initializeComplexProperties.bind(
      this
    );
    this.setPropertiesReferences = this.setPropertiesReferences.bind(this);
    this.validate = this.validate.bind(this);
    this.validateModel = this.validateModel.bind(this);
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.validationState = new ValidationState();
    this.formObservablesManager = new FormObservablesManager();
    this.modelPropsManager = new ModelPropsManager();
    fp.forOwn(value => {
      this.propertiesManager.createProperty(value.name);
      this.generateModelProp(value);
      this.generateFormObservable(value);
    })(this._propertiesSettings);
    this.setPropertiesReferences();
    ///add volatile views actions
  }
  generateModelProp(property) {
    if (!property.isModelProp) {
      return;
    }
    this.modelPropsManager.createProperty(property.name);
    modelPropGenerator({
      name: property.name,
      descriptor: property.descriptor,
      modelPropsManager: this.modelPropsManager
    });
  }
  generateFormObservable(property) {
    if (!property.isFormObservable) {
      return;
    }
    formObservableGenerator({
      name: property.name,
      descriptor: property.descriptor,
      defaultValue: property.defaultValue,
      validationsManager: property.validationsManager,
      formObservablesManager: this.formObservablesManager
    });
  }
  setPropertiesReferences() {
    const self = this;
    this.formObservablesManager.properties.forEach(
      ([propertyName, property]) => {
        Object.defineProperty(self, propertyName, property.descriptor);
      }
    );
  }

  initializeComplexProperties() {
    Object.keys(this._propertiesSettings).forEach(key => {
      const property = this[key];
      if (property instanceof ComplexType) {
        this.propertiesManager.setComplexProperty(key, {
          validate: property.validate
        });
      }
    });
  }

  validate() {
    const validationResult = this.validationsManager.validate(this);
    this.validationState.setValidationState(validationResult);
    const isChildrenValid = this.validateModel();
    this.validationState.setIsValid(isChildrenValid ? this.isValid : false);
    return this.validationState.isValid;
  }

  validateModel() {
    const modelProperties = this.modelPropsManager.properties;
    let res = true;
    for (const property in modelProperties) {
      const instance = modelProperties.getProperty(property).ref;
      instance instanceof ComplexType
        ? (res = instance.validate())
        : (res = this.formObservablesManager.getProperty(property).validate());
    }
    return res;
  }
}
/**     
* @memberof ComplexType         
* @function "setPropertySettings"
* @description this function call from formObservables and modelProp decorators, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setPropertySettings({});
*/
ComplexType.prototype.setPropertySettings = function(settings) {
  if (!settings.name) {
    fail('registerProperty faile: missing require parameter name');
  }
  //every class that extends from ComplexType
  const ComlpextTypeInheritor = this;
  ComlpextTypeInheritor._propertiesSettings =
    ComlpextTypeInheritor._propertiesSettings || {};
  const currntSettings =
    ComlpextTypeInheritor._propertiesSettings[settings.name] || {};
  ComlpextTypeInheritor._propertiesSettings[settings.name] = Object.assign(
    currntSettings,
    settings
  );
};
