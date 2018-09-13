import { observable, runInAction } from 'mobx';
import configuration from './mobxConfiguration';
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

  validate(value, type) {
    const failedValidation = this.validationsManager.validate(value, type);
    runInAction(() => {
      Object.assign(this.validationState, failedValidation);
    });
    return failedValidation.isValid;
  }
}
