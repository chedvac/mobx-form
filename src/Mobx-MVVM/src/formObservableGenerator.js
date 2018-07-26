import { observable, autorun } from 'mobx';
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
  const observableBox = observable({ value: defaultValue });

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
  // observableBox.intercept(change => {
  //   validate(change.newValue);
  //   return change;
  // });
  autorun(() => {
    validate(observableBox.value);
  });
  // observableBox.observe(function() {
  //   const dependedObservables = formObservablesManager.getProperty(name)
  //     .dependedObservables;
  //   if (!dependedObservables) {
  //     return;
  //   }
  //   //TODO lodash map
  //   for (const observable in dependedObservables) {
  //     formObservablesManager.validateProperty(observable);
  //   }
  // });

  descriptor.set = function(newValue) {
    observableBox.value = newValue;
  };

  descriptor.get = function() {
    return observableBox.value;
  };

  formObservablesManager.setFormObservableProperty(name, {
    validate,
    validationsManager,
    ref: observableBox,
    descriptor
  });
}
