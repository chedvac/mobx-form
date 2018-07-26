import { observable } from 'mobx';
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

  const validate = newValue => {
    //TODO move to utilities
    const value = newValue !== undefined ? newValue : descriptor.get();
    const dependedObservables = formObservablesManager.getProperty(name)
      .dependedObservables;
    const failedValidation = validationsManager.validate(
      value,
      dependedObservables
    );
    formObservablesManager
      .getProperty(name)
      .validationState.setValidationState(failedValidation);
    return failedValidation.isValid;
  };
  //TODO get
  observableBox.intercept(change => {
    validate(change.newValue);
    if (params.change) {
      params.change();
    }
    return change;
  });

  observableBox.observe(function() {
    const dependedObservables = formObservablesManager.getProperty(name)
      .dependedObservables;
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

  formObservablesManager.setFormObservableProperty(name, {
    validate,
    validationsManager,
    ref: observableBox,
    descriptor
  });
}
