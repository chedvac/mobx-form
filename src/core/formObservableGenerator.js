import { observable } from 'mobx';
export default function formObservableGenerator({
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

  observableBox.observe(() => {
    const dependedObservables = target.propertiesManager.getPropertyDependencies(
      name
    );
    if (!dependedObservables) {
      return;
    }
    //TODO lodash map
    for (const observable in dependedObservables) {
      target.propertiesManager.validateProperty(observable);
    }
  });

  descriptor.set = function(newValue) {
    observableBox.set(newValue);
  };

  descriptor.get = function() {
    return observableBox.get();
  };
  target.propertiesManager.setFormObservableProperty(name, {
    validate,
    validationsManager,
    ref: observableBox
  });

  Object.defineProperty(target, name, descriptor);
}
