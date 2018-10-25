import { observable, action } from 'mobx';
import configuration from './mobxConfiguration'; //eslint-disable-line no-unused-vars
import validationState from 'vm-validations/validationState';
import validationsManagerFactory from 'vm-validations/validationsManager';

export default class ValidateableDefinition {
  constructor(settings) {
    this.name = settings.name;
    this.type = settings.type;
    this.validationState = observable(validationState);
    this.validationsManager = new validationsManagerFactory(
      settings.validations || [],
      settings.type
    );
  }
  @action
  setValidationState(validationState) {
    Object.assign(this.validationState, validationState);
  }
  async validate(value) {
    const failedValidation = await this.validationsManager.validate(value);
    this.setValidationState(failedValidation);
    return failedValidation.isValid;
  }

  validateType = (value, type) => {
    const failedValidation = this.validationsManager.validateType(value, type);
    this.setValidationState(failedValidation.validationState);
    return failedValidation.value;
  };
}
