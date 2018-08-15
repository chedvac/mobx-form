import { observable } from 'mobx';
import configuration from './mobxConfiguration';
import ValidationState from 'core/validationState';
import validationsManagerFactory from 'validations/core/validationsManager';

export default class ValidateableObservableBehavior {
  constructor(property) {
    this.name = property.name;
    this.validationState = new ValidationState();
    this.validationsManager = new validationsManagerFactory(
      property.validations || []
    );
    this.dependedObservables = property.dependedObservables || {};
    this.observable = this.createObservableBox(property);
  }
  createObservableBox(property) {
    const observableBox = observable.box(property.defaultValue, {
      name: property.name
    });
    const self = this;
    observableBox.intercept(change => {
      self.validate(change.newValue);
      return change;
    });

    observableBox.observe(() => {
      if (!this.dependedObservables) {
        return;
      }
      //TODO lodash map
      for (const observable in this.dependedObservables) {
        if (this.dependedObservables.hasOwnProperty(observable)) {
          this.validationsManager.validate(observable); //todo: call to correct validate function
        }
      }
    });
    return observableBox;
  }
  
  validate(newValue) {
    //TODO move to utilities
    const value = newValue !== undefined ? newValue : this.observable.get();
    const failedValidation = this.validationsManager.validate(
      value,
      this.dependedObservables
    );
    this.validationState.setValidationState(failedValidation);
    return failedValidation.isValid;
  }
}
