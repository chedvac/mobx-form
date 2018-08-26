import configuration from './mobxConfiguration';
import ValidationState from 'core/validationState';
import validationsManagerFactory from 'validations/core/validationsManager';

export default class ValidateableBehavior {
  constructor(settings) {
    this.name = settings.name;
    this.validationState = new ValidationState();
    this.validationsManager = new validationsManagerFactory(
      settings.validations || []
    );
    this.dependedObservables = settings.dependedObservables || {};
  }

  validate(value) {
    const failedValidation = this.validationsManager.validate(
      value,
      this.dependedObservables
    );
    this.validationState.setValidationState(failedValidation);
    return failedValidation.isValid;
  }
}
