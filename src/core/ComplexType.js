import validationsManagerFactory from '../validations/validationsManager';
import { initializeProperties } from './initializeProperties';
import PropertiesManager from './PropertiesManager';
import ValidationState from './ValidationState';
import Exception from './exceptions';

export default class ComplexType {
  constructor(settings = {}) {
    this.propertiesManager = new PropertiesManager();
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.initializeComplexProperties = this.initializeComplexProperties.bind(
      this
    );
    this.validationState = new ValidationState();
    initializeProperties(this, this._properties);
    this.validate = this.validate.bind(this);
    ///add volatile views actions
  }
  registerProperty({ name, descriptor, ...settings }) {
    if (!name || !descriptor) {
      throw new Exception(
        'registerProperty faile: missing require parameter: descriptor or name'
      );
    }
    this._properties = this._properties || {};
    this._properties[name] = this._properties[name] || { name, descriptor };
    Object.assign(this._properties[name], settings);
  }

  initializeComplexProperties() {
    Object.keys(this._properties).forEach(key => {
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
      isChildrenValid ? this.validationState.isValid : false
    );
    return this.validationState.isValid;
  }
}
