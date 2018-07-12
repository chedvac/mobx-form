import { maxlength, minlength, length, required } from '../../rules/basic';
import { testPropTypes } from '../common/testPropTypes';

describe('basic rules', () => {
  describe('required', () => {
    test('shuold be defined', () => {
      expect(required).toBeDefined();
    });

    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          required();
        }).not.toThrow();
      });

      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(required, 'message', 'func', { value: 2 })
        );
        //test('success message params')
      });
    });

    describe('return params', () => {
      let requiredRule;
      beforeEach(() => {
        requiredRule = required();
      });

      test('should return object', () => {
        expect(typeof requiredRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(requiredRule.name).toBeDefined();
        expect(requiredRule.message).toBeDefined();
        expect(requiredRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof requiredRule.message).toBe('function');
        expect(typeof requiredRule.validator).toBe('function');
      });
    });
  });

  describe('maxlength', () => {
    test('shuold be defined', () => {
      expect(maxlength).toBeDefined();
    });

    describe('params', () => {
      describe('value', () => {
        test(
          'should throw if not exist or undefined or null',
          testPropTypes(maxlength, 'value', 'isRequired')
        );
        test(
          'should throw if not number',
          testPropTypes(maxlength, 'value', 'number')
        );
        test('should not throw if number', () => {
          expect(() => {
            maxlength({ value: 3 });
          }).not.toThrow();
        });
      });
      describe('message', () => {
        test('should not throw if not exist', () => {
          expect(() => {
            maxlength({ value: 2 });
          }).not.toThrow();
        });
        test(
          'should throw if not func',
          testPropTypes(maxlength, 'message', 'func', { value: 2 })
        );
        test('should not throw if func', () => {
          expect(() => {
            maxlength({ value: 3, message: () => 'too long...' });
          }).not.toThrow();
        });
      });
    });

    describe('return object', () => {
      let maxlengthRule;
      beforeEach(() => {
        maxlengthRule = maxlength({ value: 5 });
      });

      test('should return object', () => {
        expect(typeof maxlengthRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(maxlengthRule.name).toBeDefined();
        expect(maxlengthRule.message).toBeDefined();
        expect(maxlengthRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof maxlengthRule.message).toBe('function');
        expect(typeof maxlengthRule.validator).toBe('function');
      });
    });
  });

  describe('minlength', () => {
    test('shuold be defined', () => {
      expect(minlength).toBeDefined();
    });

    describe('params', () => {
      describe('value', () => {
        test(
          'should throw if not exist or undefined or null',
          testPropTypes(minlength, 'value', 'isRequired')
        );
        test(
          'should throw if not number',
          testPropTypes(minlength, 'value', 'number')
        );
        test('should not throw if number', () => {
          expect(() => {
            minlength({ value: 3 });
          }).not.toThrow();
        });
      });
      describe('message', () => {
        test('should not throw if not exist', () => {
          expect(() => {
            minlength({ value: 2 });
          }).not.toThrow();
        });
        test(
          'should throw if not func',
          testPropTypes(minlength, 'message', 'func', { value: 2 })
        );
        test('should not throw if func', () => {
          expect(() => {
            minlength({ value: 3, message: () => 'too short...' });
          }).not.toThrow();
        });
      });
    });

    describe('return object', () => {
      let minlengthRule;
      beforeEach(() => {
        minlengthRule = minlength({ value: 5 });
      });

      test('should return object', () => {
        expect(typeof minlengthRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(minlengthRule.name).toBeDefined();
        expect(minlengthRule.message).toBeDefined();
        expect(minlengthRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof minlengthRule.message).toBe('function');
        expect(typeof minlengthRule.validator).toBe('function');
      });
    });
  });

  describe('length', () => {
    test('shuold be defined', () => {
      expect(length).toBeDefined();
    });

    describe('params', () => {
      describe('value', () => {
        test(
          'should throw if not exist or undefined or null',
          testPropTypes(length, 'value', 'isRequired')
        );
        test(
          'should throw if not number',
          testPropTypes(length, 'value', 'number')
        );
        test('should not throw if number', () => {
          expect(() => {
            length({ value: 3 });
          }).not.toThrow();
        });
      });
      describe('message', () => {
        test('should not throw if not exist', () => {
          expect(() => {
            length({ value: 2 });
          }).not.toThrow();
        });
        test(
          'should throw if not func',
          testPropTypes(length, 'message', 'func', { value: 2 })
        );
        test('should not throw if func', () => {
          expect(() => {
            length({ value: 3, message: () => 'too short...' });
          }).not.toThrow();
        });
      });
    });

    describe('return object', () => {
      let lengthRule;
      beforeEach(() => {
        lengthRule = length({ value: 5 });
      });

      test('should return object', () => {
        expect(typeof lengthRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(lengthRule.name).toBeDefined();
        expect(lengthRule.message).toBeDefined();
        expect(lengthRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof lengthRule.message).toBe('function');
        expect(typeof lengthRule.validator).toBe('function');
      });
    });
  });
});
