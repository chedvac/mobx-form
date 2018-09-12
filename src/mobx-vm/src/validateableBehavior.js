import { observable, action } from 'mobx';
import configuration from './mobxConfiguration'; //eslint-disable-line no-unused-vars
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
  set_validationState(validationState) {
    Object.assign(this.validationState, validationState);
  }
  async validate(value) {
    const failedValidation = await this.validationsManager.validate(value);
    this.set_validationState(failedValidation);
    return failedValidation.isValid;
  }
}
