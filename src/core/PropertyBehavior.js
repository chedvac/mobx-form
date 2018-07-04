import ValidationState from './ValidationState';
import ValidationsManager from '../validations/src/core/validationsManager';

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
  setValidationsManager = function(validationsManagerIns) {
    if (!(validationsManagerIns instanceof ValidationsManager)) {
      throw 'setValidationsManager expect to get object that extends  ValidationsManager';
    }
    this.validationsManager = validationsManagerIns;
  };
  setMap = function(map) {
    this.map = map;
  };
  setRef = function(ref) {
    this.ref = ref;
  };
}
