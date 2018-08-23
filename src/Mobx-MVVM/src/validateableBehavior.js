import configuration from './mobxConfiguration';
import ValidationState from 'core/validationState';
import validationsManagerFactory from 'vmValidations/validationsManager';

export default class ValidateableBehavior {
  constructor(property) {
    this.name = property.name;
    this.validationState = new ValidationState();
    this.validationsManager = new validationsManagerFactory(
      property.validations || []
    );
    this.dependedObservables = property.dependedObservables || {};
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
