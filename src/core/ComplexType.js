import validationsManagerFactory from 'validations/core/validationsManager';
import FormObservablesManager from './propertiesManager/FormObservablesManager';
import ModelPropsManager from './propertiesManager/ModelPropsManager';
import ValidationState from 'core/ValidationState';
import formObservableGenerator from './formObservableGenerator';
import { modelPropGenerator } from './modelProp';
import PropTypes from 'prop-types';
import assertParametersType from 'core/typeVerifications';
import fp from 'lodash/fp';
export default class ComplexType {
  constructor(settings = {}) {
    this.formObservablesManager = new FormObservablesManager();
    this.modelPropsManager = new ModelPropsManager();

    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.validationState = new ValidationState();
    this.formObservablesManager = new FormObservablesManager();
    this.modelPropsManager = new ModelPropsManager();
    fp.forOwn(value => {
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
    this.formObservablesManager.createProperty(property.name);
    formObservableGenerator({
      name: property.name,
      descriptor: property.descriptor,
      defaultValue: property.defaultValue,
      validationsManager: property.validationsManager,
      formObservablesManager: this.formObservablesManager,
      change: property.onChange
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
    Object.keys(this._propertiesSettings).forEach(key => {
      const property = this[key];
      if (property instanceof ComplexType) {
        this.modelPropsManager.setComplexProperty(key, {
          ref: property
        });
      }
    });
  }

  validate() {
    const validationResult = this.validationsManager.validate(this);
    this.validationState.setValidationState(validationResult);
    const isChildrenValid = this.validateModel();
    this.validationState.setIsValid(
      isChildrenValid && validationResult.isValid
    );
    return this.validationState.isValid;
  }

  validateModel() {
    let childrenResult = true;
    Object.entries(this.modelPropsManager.getProperties()).forEach(
      ([name, property]) => {
        let childResult = true;
        const instance = property.ref;
        instance instanceof ComplexType
          ? (childResult = instance.validate())
          : (childResult = this.formObservablesManager
              .getProperty(name)
              .validate());

        childrenResult = childrenResult && childResult;
      }
    );
    return childrenResult;
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
