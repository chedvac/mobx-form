import ValidateableDefinition from 'mobx-vm/validateableDefinition';
import validationsManagerFactory from 'vm-validations/validationsManager';
import { isObservable } from 'mobx';

let validateableDefinition;
const settings = { name: 'firstName', validations: [() => true, () => false] };
beforeAll(() => {
  validateableDefinition = new ValidateableDefinition(settings);
});
describe('ValidateableDefinition', () => {
  describe('properties:', () => {
    test('name', () => {
      expect(validateableDefinition.name).toEqual(settings.name);
    });
    test('validationState', () => {
      expect(validateableDefinition.validationState).toBeDefined();
    });
    test('validationState is observable ', () => {
      expect(isObservable(validateableDefinition.validationState)).toBeTruthy();
    });
    test('validationsManager is instanceof  validationsManagerFactory', () => {
      expect(
        validateableDefinition.validationsManager instanceof
          validationsManagerFactory
      ).toBeTruthy();
    });
    test('validationsManager contains settings.validations', () => {
      expect(validateableDefinition.validationsManager.validations).toEqual(
        settings.validations
      );
    });
    test('validationsManager contains [] validations by default', () => {
      const validateableDefinition2 = new ValidateableDefinition({
        name: 'lastName'
      });
      expect(validateableDefinition2.validationsManager.validations).toEqual(
        []
      );
    });
    test('setValidationState', () => {
      expect(validateableDefinition.setValidationState).toBeDefined();
    });
    test('validate', () => {
      expect(validateableDefinition.validate).toBeDefined();
    });
  });
  describe('validate:', () => {
    beforeAll(() => {
      validateableDefinition.validationsManager.validate = jest
        .fn()
        .mockReturnValue({ isValid: false, message: 'dddd' });
    });

    test('is async', () => {
      expect(validateableDefinition.validate[Symbol.toStringTag]).toEqual(
        'AsyncFunction'
      );
    });
    test('update validationState with failed validation', async () => {
      await validateableDefinition.validate('newValue');
      expect(validateableDefinition.validationState.isValid).toBeFalsy();
      expect(validateableDefinition.validationState.message).toEqual('dddd');
    });
    test('return validation result', async () => {
      expect(await validateableDefinition.validate('newValue')).toBeFalsy();
    });
  });
});
