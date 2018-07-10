import ValidationState from "../ValidationState";

export default class FormObservableBehavior {
  constructor() {
    this.validationState = new ValidationState();
  }
  dependedObservables = {};
  setDependedObservables = function(dependedObservables) {
    this.dependedObservables = dependedObservables;
  };
  setValidate = function(validate) {
    this.validate = validate;
  };
  setValidationsManager = function(validationsManager) {
    this.validationsManager = validationsManager;
  };
  setRef = function(ref) {
    this.ref = ref;
  };
}
