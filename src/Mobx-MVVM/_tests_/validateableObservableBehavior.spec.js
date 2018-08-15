import ValidationState from 'core/validationState';
import ValidateableObservableBehavior from 'core/validateableObservableBehavior';
import validationsManager from 'validations/core/validationsManager';

let validateableObservable;
beforeAll(() => {
  validateableObservable = new ValidateableObservableBehavior();
});
describe('ValidateableObservableBehavior', () => {
  describe('define properties:', () => {
    test('validationState', () => {
      expect(validateableObservable.validationState).toBeDefined();
    });
    test('validationState is instanceof ValidationState', () => {
      expect(validateableObservable.validationState instanceof ValidationState).toBe(
        true
      );
    });
    test('setDependedObservables', () => {
      expect(validateableObservable.setDependedObservables).toBeDefined();
    });
    test('setValidate', () => {
      expect(validateableObservable.setValidate).toBeDefined();
    });
    test('setValidationsManager', () => {
      expect(validateableObservable.setValidationsManager).toBeDefined();
    });
   
  });
  describe('logic:', () => {
    test('setDependedObservables', () => {
      const dependedObservables = {};
      validateableObservable.setDependedObservables(dependedObservables);
      expect(validateableObservable.dependedObservables).toBe(dependedObservables);
    });
    test('setValidate', () => {
      const validate = () => {};
      validateableObservable.setValidate(validate);
      expect(validateableObservable.validate).toBe(validate);
    });
    test('setValidationsManager', () => {
      const validationsManage = new validationsManager();
      validateableObservable.setValidationsManager(validationsManage);
      expect(validateableObservable.validationsManager).toBe(validationsManage);
    });

  
  });
});
