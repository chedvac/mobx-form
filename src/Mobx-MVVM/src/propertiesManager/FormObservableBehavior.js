import ValidationState from 'core/ValidationState';
import ValidationsManager from 'validations/core/validationsManager';
import fail from 'utils/fail';
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
  setValidationsManager = function(validationsManagerIns) {
    if (!(validationsManagerIns instanceof ValidationsManager)) {
      fail('setValidationsManager expect to get object that extends  ValidationsManager');
    }
    this.validationsManager = validationsManagerIns;
  };
  setDescriptor = function(descriptor) {
    this.descriptor = descriptor;
  };
  setRef = function(ref) {
    this.ref = ref;
  };
}
