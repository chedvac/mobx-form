import ValidationState from 'core/validationState';
import ValidateableBehavior from 'core/validateableBehavior';
import validationsManager from 'validations/core/validationsManager';

let validateable;
beforeAll(() => {
  validateable = new ValidateableBehavior();
});
describe('ValidateableBehavior', () => {
  describe('define properties:', () => {
    test('validationState', () => {
      expect(validateable.validationState).toBeDefined();
    });
    test('validationState is instanceof ValidationState', () => {
      expect(validateable.validationState instanceof ValidationState).toBe(
        true
      );
    });
    test('setDependedObservables', () => {
      expect(validateable.setDependedObservables).toBeDefined();
    });
    test('setValidate', () => {
      expect(validateable.setValidate).toBeDefined();
    });
    test('setValidationsManager', () => {
      expect(validateable.setValidationsManager).toBeDefined();
    });
   
  });
  describe('logic:', () => {
    test('setDependedObservables', () => {
      const dependedObservables = {};
      validateable.setDependedObservables(dependedObservables);
      expect(validateable.dependedObservables).toBe(dependedObservables);
    });
    test('setValidate', () => {
      const validate = () => {};
      validateable.setValidate(validate);
      expect(validateable.validate).toBe(validate);
    });
    test('setValidationsManager', () => {
      const validationsManage = new validationsManager();
      validateable.setValidationsManager(validationsManage);
      expect(validateable.validationsManager).toBe(validationsManage);
    });

  
  });
});
