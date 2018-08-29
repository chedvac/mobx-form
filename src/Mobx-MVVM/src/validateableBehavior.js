import { observable, runInAction } from 'mobx';
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

  async validate(value) {
    const failedValidation = await this.validationsManager.validate(value);
    runInAction(() => {
      Object.assign(this.validationState, failedValidation);
    });
    return failedValidation.isValid;
  }
}
