import { observable, reaction } from 'mobx';
import configuration from './mobxConfiguration';

export default function({
  formObservablesManager,
  name,
  descriptor,
  validationsManager,
  defaultValue,
  ...params
} = params) {
  delete descriptor.initializer;
  delete descriptor.value;
  delete descriptor.writable;
  const observableBox = observable.box(defaultValue, { name });

  //TODO get
  observableBox.intercept(change => {
    validate(change.newValue);
    return change;
  });

  observableBox.observe(function() {
    const dependedObservables = formObservablesManager.getPropertyDependencies(
      name
    );
    if (!dependedObservables) {
      return;
    }
    //TODO lodash map
    for (const observable in dependedObservables) {
      formObservablesManager.validateProperty(observable);
    }
  });

  descriptor.set = function(newValue) {
    observableBox.set(newValue);
  };

  descriptor.get = function() {
    return observableBox.get();
  };

  const validate = newValue => {
    //TODO move to utilities
    const value = newValue !== undefined ? newValue : descriptor.get();
    const dependedObservables = formObservablesManager.getPropertyDependencies(
      name
    );
    let failedValidation = validationsManager.validate(
      value,
      dependedObservables
    );
    formObservablesManager
      .getPropertyValidationState(name)
      .setValidationState(failedValidation);
    return failedValidation.isValid;
  };
  formObservablesManager.setFormObservableProperty(name, {
    validate,
    validationsManager,
    ref: observableBox
  });
}
