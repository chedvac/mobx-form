<<<<<<< HEAD
import { observable } from 'mobx';
export default function formObservableGenerator({
=======
import { observable, reaction } from 'mobx';
import configuration from './mobxConfiguration';

export default function({
>>>>>>> f62be2aa641121e3667d9dacf8b57e70b45aecac
  target,
  name,
  descriptor,
  validationsManager,
  ...params
} = params) {
  const defaultValue = descriptor
    ? descriptor.initializer
      ? descriptor.initializer.call(target)
      : descriptor.value
    : undefined;
  delete descriptor.initializer;
  delete descriptor.value;
  delete descriptor.writable;

  const observableBox = observable.box(defaultValue, { name });

  const validate = newValue => {
    //TODO move to utilities
    const value = newValue !== undefined ? newValue : descriptor.get();
    // const dependedObservables = target.propertiesManager.getPropertyDependencies(name);
    const failedValidation = validationsManager.validate(value);
    target.propertiesManager
      .getPropertyValidationState(name)
      .setValidationState(failedValidation);
    return failedValidation.isValid;
  };

  //TODO get
  observableBox.intercept(change => {
    validate(change.newValue);
    return change;
  });

<<<<<<< HEAD
  observableBox.observe(() => {
    const dependedObservables = target.propertiesManager.getPropertyDependencies(
=======
  observableBox.observe(function() {
    const dependedObservables = target.formObservablesManager.getPropertyDependencies(
>>>>>>> f62be2aa641121e3667d9dacf8b57e70b45aecac
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
<<<<<<< HEAD
  target.propertiesManager.setFormObservableProperty(name, {
    validate,
    validationsManager,
    ref: observableBox
  });
=======

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
>>>>>>> f62be2aa641121e3667d9dacf8b57e70b45aecac

  Object.defineProperty(target, name, descriptor);
}
