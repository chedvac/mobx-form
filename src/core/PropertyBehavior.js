import ValidationState from "./ValidationState";

export default class PropertyBehavior {
  constructor() {
    this.validationState = new ValidationState();
  }
  dependedObservables = {};
  setDependedObservables = function(dependedObservables) {
    this.dependedObservables = dependedObservables;
  };
  setReset = function(reset) {
    this.reset = reset;
  };
  setValidate = function(validate) {
    this.validate = validate;
  };
  setValidationsManager = function(validationsManager) {
    this.validationsManager = validationsManager;
  };
  setMap = function(map) {
    this.map = map;
  };
  setRef = function(ref) {
    this.ref = ref;
  };
}
