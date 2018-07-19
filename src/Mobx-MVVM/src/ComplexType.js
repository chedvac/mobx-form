import validationsManagerFactory from 'validations/core/validationsManager';
import FormObservablesManager from './propertiesManager/FormObservablesManager';
import ModelPropsManager from './propertiesManager/ModelPropsManager';
import ValidationState from 'core/ValidationState';
import formObservableGenerator from './formObservableGenerator';
import { modelPropGenerator } from './modelProp';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';
import fp from 'lodash/fp';
export default class ComplexType {
  constructor(settings = {}) {
    this.formObservablesManager = new FormObservablesManager();
    this.modelPropsManager = new ModelPropsManager();

    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.validationState = new ValidationState();

    fp.forOwn(value => {
      this.generateModelProp(value);
      this.generateFormObservable(value);
    })(this._propertiesSettings);
    this.setPropertiesReferences();
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
    this.formObservablesManager.createProperty(property.name);
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
    Object.keys(self.formObservablesManager.getProperties()).forEach(
      propertyName => {
        const property = self.formObservablesManager.getProperty(propertyName);
        Object.defineProperty(self, propertyName, property.descriptor);
      }
    );
  }

  initializeComplexProperties() {
    const self = this;
    Object.keys(this._propertiesSettings).forEach(key => {
      const property = self[key];
      if (property instanceof ComplexType) {
        self.modelPropsManager.setComplexProperty(key, {
          ref: property
        });
      }
    });
  }
 /**     
* @memberof ComplexType         
* @function "validate"
* @description validate complexType and its properties
* @return {bool} manipulation result
* @example 
  PersonalInfo.validate();
*/
  validate() {
    const validationResult = this.validationsManager.validate(this);
    this.validationState.setValidationState(validationResult);
    const propertiesValidationResult = this.validateModel();
    this.validationState.setIsValid(
      propertiesValidationResult && validationResult.isValid
    );
    return this.validationState.isValid;
  }
   /**     
* @memberof ComplexType         
* @function "validateModel"
* @description validate all model properties
* @return {bool} properties validation state result
* @example 
  PersonalInfo.validateModel();
*/
  validateModel() {
    let propertiesState = true;
    Object.entries(this.modelPropsManager.getProperties()).forEach(
      ([name, property]) => {
        propertiesState =propertiesState && this._validateByType(name, property);
      }
    );
    return propertiesState;
  }
  _validateByType(name, property) {
    const instance = property.ref;
    return instance instanceof ComplexType?
      instance.validate()
      : this.formObservablesManager.getProperty(name).validate();

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
  const propTypes = {
    settings: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  };
  assertParametersType({ settings }, propTypes, 'setPropertySettings');
  //'this'- every class that extends ComplexType
  this._propertiesSettings = this._propertiesSettings || {};
  const currntSettings = this._propertiesSettings[settings.name] || {};
  this._propertiesSettings[settings.name] = Object.assign(
    currntSettings,
    settings
  );
};
