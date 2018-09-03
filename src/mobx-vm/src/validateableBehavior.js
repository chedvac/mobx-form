import { observable, action } from 'mobx';
import configuration from './mobxConfiguration';//eslint-disable-line no-unused-vars
import validationState from 'vm-validations/validationState';
import validationsManagerFactory from 'vm-validations/validationsManager';

export default class ValidateableBehavior {
  constructor(settings) {
    this.name = settings.name;
    this.validationState = observable(validationState);
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
  }
  @action
<<<<<<< HEAD
  set_validationState(validationState){
=======
  setValidationState(validationState) {
>>>>>>> 781341729e3e064f48d4e5af88eb22dc7eb1cf8c
    Object.assign(this.validationState, validationState);
  }
  async validate(value) {
    const failedValidation = await this.validationsManager.validate(value);
    this.set_validationState(failedValidation);
    return failedValidation.isValid;
  }
}
