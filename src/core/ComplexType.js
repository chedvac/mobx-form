import validationsManagerFactory from '../validations/validationsManager';
import { initializeProperties } from './complexPropertiesRegistration';
import PropertiesManager from './PropertiesManager';
import ValidationState from './ValidationState';
import fail from './exeptions';
export default class ComplexType {
  constructor(settings = {}) {
    this.propertiesManager = new PropertiesManager();
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.validationState = new ValidationState();
    initializeProperties(this, this._properties);
    this.validate = this.validate.bind(this);
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
    const isChildrenValid = this.propertiesManager.validate({ parent: this });
    this.validationState.setIsValid(isChildrenValid ? this.isValid : false);
    return this.validationState.isValid;
  }
}
