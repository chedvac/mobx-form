import { observable, reaction } from 'mobx';
import configuration from './mobxConfiguration';

export default function({
  target,
  name,
  descriptor,
  validationsManager,
  ...params
} = params) {
  var defaultValue = descriptor
    ? descriptor.initializer
      ? descriptor.initializer.call(target)
      : descriptor.value
    : undefined;
  delete descriptor.initializer;
  delete descriptor.value;
  delete descriptor.writable;

  const observableBox = observable.box(defaultValue, { name });
  //TODO get
  observableBox.intercept(function(change) {
    validate(change.newValue);
    return change;
  });

  observableBox.observe(function() {
    const dependedObservables = target.formObservablesManager.getPropertyDependencies(
      name
    );
    if (!dependedObservables) {
      return;
    }
    //TODO lodash map
    for (const observable in dependedObservables) {
      target.formObservablesManager.validateProperty(observable);
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
    const dependedObservables = target.formObservablesManager.getPropertyDependencies(
      name
    );
    let failedValidation = validationsManager.validate(
      value,
      dependedObservables
    );
    target.formObservablesManager
      .getPropertyValidationState(name)
      .setValidationState(failedValidation);
    return failedValidation.isValid;
  };
  target.formObservablesManager.setFormObservableProperty(
    name,
    {
      validate,
      validationsManager,
      ref: observableBox
    }
  );

  Object.defineProperty(target, name, descriptor);
}
