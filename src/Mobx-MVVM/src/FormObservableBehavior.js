import { observable } from 'mobx';
import ValidationState from 'core/ValidationState';
import validationsManagerFactory from 'validations/core/validationsManager';

export default class FormObservableBehavior {
  //todo: remove sets functions and move all assignments to constroctor
  constructor(property) {
    this.name = property.name;
    this.validationState = new ValidationState();
    this.validationsManager = new validationsManagerFactory(
      property.validations || []
    );
    this.dependedObservables = property.dependedObservables || {};
    this.ref = this.createObservableBox(property);
    this.descriptor = this.handleDescriptor(property);//todo:rename

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
  handleDescriptor(property) {
    const self = this;
    delete property.descriptor.initializer;
    delete property.descriptor.value;
    delete property.descriptor.writable;
    
    property.descriptor.set = function(newValue) {
      self.ref.set(newValue);
    };
    
    property.descriptor.get = function() {
      return self.ref.get();
    };
    return property.descriptor;
  }

  validate(newValue) {
    //TODO move to utilities
    const value = newValue !== undefined ? newValue : this.descriptor.get();
    const failedValidation = this.validationsManager.validate(
      value,
      this.dependedObservables
    );
    this.validationState.setValidationState(failedValidation);
    return failedValidation.isValid;
  }
}
