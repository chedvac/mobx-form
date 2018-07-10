import validationsManagerFactory from '../validations/src/core/validationsManager';
import { initializeProperties } from './complexPropertiesRegistration';
import FormObservablesManager from './propertiesManager/FormObservablesManager';
import ModelPropsManager from './propertiesManager/ModelPropsManager';
import ValidationState from './ValidationState';
import fail from './exeptions';
export default class ComplexType {
  constructor(settings = {}) {
    this.formObservablesManager = new FormObservablesManager();
    this.modelPropsManager = new ModelPropsManager();  

    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.validationState = new ValidationState();
    initializeProperties(this, this._properties);
    this.validate = this.validate.bind(this);
    this.validateModel = this.validateModel.bind(this);
    ///add volatile views actions
  }
  registerProperty({ name, descriptor, ...settings }) {
    if (!name || !descriptor) {
      fail(
        'registerProperty faile: missing require parameter: target, descriptor or name'
      );
    }
    this._properties = this._properties || {};
    this._properties[name] = this._properties[name] || { name, descriptor };
    Object.assign(this._properties[name], settings);
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
     instance instanceof ComplexType?
        res = instance.validate():
        res =  this.formObservablesManager.getProperty(property).validate();
    }
    return res;
  }
}
