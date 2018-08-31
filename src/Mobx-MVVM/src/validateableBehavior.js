import { observable, action } from 'mobx';
import configuration from './mobxConfiguration';
import validationState from 'vmValidations/validationState';
import validationsManagerFactory from 'vmValidations/validationsManager';

export default class ValidateableBehavior {
  constructor(settings) {
    this.name = settings.name;
    this.validationState = observable(validationState);
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
  }
  @action
  setValidationState(validationState){
    Object.assign(this.validationState, validationState);
  }
  async validate(value) {
    const failedValidation = await this.validationsManager.validate(value);
    this.setValidationState(failedValidation);
    return failedValidation.isValid;
  }
}
