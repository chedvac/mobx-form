import validationsManagerFactory from 'validations/core/validationsManager';
import PropertiesManager from 'core/PropertiesManager';
import ValidationState from 'core/ValidationState';
import Exception from './exceptions';
import formObservableGenerator from 'core/formObservableGenerator';
import modelPropGenerator from 'core/modelProp';
import fp from 'lodash/fp';
export default class ComplexType {
  constructor(settings = {}) {
    this.initializeComplexProperties = this.initializeComplexProperties.bind(
      this
    );
    this.setPropertiesDescriptors = this.setPropertiesDescriptors.bind(this);
    this.validate = this.validate.bind(this);
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.validationState = new ValidationState();
    this.propertiesManager = new PropertiesManager();
    fp.forOwn(value => {
      this.propertiesManager.createProperty(value.name);
      this.generateModelProp(value);
      this.generateFormObservable(value);
    })(this._propertiesSettings);
    this.setPropertiesDescriptors();
    ///add volatile views actions
  }
  generateModelProp(property) {
    if (!property.isModelProp) {
      return;
    }
    modelPropGenerator({
      name: property.name,
      descriptor: property.descriptor,
      propertiesManager: this.propertiesManager
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
      propertiesManager: this.propertiesManager
    });
  }
  setPropertiesDescriptors() {
    const propertiesObservables = this.propertiesManager.getPropertiesDescriptors();
    const self = this;
    Object.entries(propertiesObservables).forEach(
      ([propertyName, descriptor]) => {
        Object.defineProperty(self, propertyName, descriptor);
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
    const isChildrenValid = this.propertiesManager.validate({ parent: this });
    this.validationState.setIsValid(
      isChildrenValid && this.validationState.isValid
    );
    return this.validationState.isValid;
  }
}
/**     
* @memberof ComplexType         
* @function "setPropertySettings"
* @description this function call from formObservables and modelProp decorators, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.registerPropertyToPrototype({});
*/
ComplexType.prototype.setPropertySettings = function(settings) {
  if (!settings.name) {
    throw new Exception(
      'registerProperty faile: missing require parameter name'
    );
  }
  //this - the class that extends from ComplexType
  this._propertiesSettings = this._propertiesSettings || {};
  const currntSettings = this._propertiesSettings[settings.name] || {};
  this._propertiesSettings[settings.name] = Object.assign(
    currntSettings,
    settings
  );
};
