import ValidationState from 'core/ValidationState';
import FormObservableBehavior from 'core/propertiesManager/FormObservableBehavior';
import validationsManager from 'validations/core/validationsManager';

let formObservable;
beforeAll(() => {
  formObservable = new FormObservableBehavior();
});
describe('FormObservableBehavior', () => {
  describe('define properties:', () => {
    test('validationState', () => {
      expect(formObservable.validationState).toBeDefined();
    });
    test('validationState is instanceof ValidationState', () => {
      expect(formObservable.validationState instanceof ValidationState).toBe(
        true
      );
    });
    test('setDependedObservables', () => {
      expect(formObservable.setDependedObservables).toBeDefined();
    });
    test('setValidate', () => {
      expect(formObservable.setValidate).toBeDefined();
    });
    test('setValidationsManager', () => {
      expect(formObservable.setValidationsManager).toBeDefined();
    });
    test('setRef', () => {
      expect(formObservable.setRef).toBeDefined();
    });
  });
  describe('logic:', () => {
    test('setDependedObservables', () => {
      const dependedObservables = {};
      formObservable.setDependedObservables(dependedObservables);
      expect(formObservable.dependedObservables).toBe(dependedObservables);
    });
    test('setValidate', () => {
      const validate = () => {};
      formObservable.setValidate(validate);
      expect(formObservable.validate).toBe(validate);
    });
    test('setValidationsManager', () => {
      const validationsManage = new validationsManager();
      formObservable.setValidationsManager(validationsManage);
      expect(formObservable.validationsManager).toBe(validationsManage);
    });

    test('setRef', () => {
      const ref = {};
      formObservable.setRef(ref);
      expect(formObservable.ref).toBe(ref);
    });
  });
});
