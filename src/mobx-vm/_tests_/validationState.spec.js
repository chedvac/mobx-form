import ValidationState from 'mobx-vm/validationState';
import { isObservableProp } from 'mobx';
let ValidationStateInst;
beforeEach(() => {
  ValidationStateInst = new ValidationState();
});
describe('ValidationState', () => {
  describe('properties', () => {
    describe('message', () => {
      test('is observable', () => {
        expect(isObservableProp(ValidationStateInst, 'message')).toBeTruthy();
      });
      test('default value is empty string', () => {
        expect(ValidationStateInst.message).toBe('');
      });
    });
    describe('isVaild', () => {
      test('is observable', () => {
        expect(isObservableProp(ValidationStateInst, 'isValid')).toBeTruthy();
      });
      test('default value is empty string', () => {
        expect(ValidationStateInst.isValid).toBe(true);
      });
    });
    describe('setMessage', () => {
      test('is function', () => {
        expect(typeof ValidationStateInst.setMessage).toBe('function');
      });
      describe('update message', () => {
        test('should get message as string', () => {
          expect(() => {
            ValidationStateInst.setMessage({});
          }).toThrowError('should get string param');
          expect(() => {
            ValidationStateInst.setMessage();
          }).toThrowError('should get string param');
        });
        test('update values', () => {
          ValidationStateInst.setMessage('not valid');
          expect(ValidationStateInst.message).toBe('not valid');
        });
      });
    });
    describe('setValidationState', () => {
      test('is action', () => {
        expect(typeof ValidationStateInst.setValidationState).toBe('function');
      });
      describe('update ValidationState.isValid and ValidationState.message', () => {
        test('should get object with isValid and message keys', () => {
          expect(() => {
            ValidationStateInst.setValidationState({});
          }).toThrowError('missing require parameter: isValid');
          expect(() => {
            ValidationStateInst.setValidationState({});
          }).toThrowError('missing require parameter: isValid');
        });
        test('update values', () => {
          ValidationStateInst.setValidationState({
            isValid: false,
            message: 'not valid'
          });
          expect(ValidationStateInst.isValid).toBeFalsy();
          expect(ValidationStateInst.message).toBe('not valid');
        });
      });
    });
    describe('setIsValid', () => {
      test('is function', () => {
        expect(typeof ValidationStateInst.setValidationState).toBe('function');
      });
      test('should isValid as boolean', () => {
        expect(() => {
          ValidationStateInst.setIsValid({});
        }).toThrowError('should get boolean param');
        expect(() => {
          ValidationStateInst.setIsValid('true');
        }).toThrowError('should get boolean param');
      });
      test('update value', () => {
        ValidationStateInst.setIsValid(false);
        expect(ValidationStateInst.isValid).toBeFalsy();
        ValidationStateInst.setIsValid(true);
        expect(ValidationStateInst.isValid).toBeTruthy();
      });
    });
  });
});
