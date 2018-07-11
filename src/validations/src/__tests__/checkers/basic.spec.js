import {
  maxlengthChecker,
  minlengthChecker,
  lengthChecker
} from '../../checkers/basic';
import { testPropTypes } from '../common/testPropTypes';

describe('basic validation', () => {
  let wrrapMaxlengthChecker;
  let wrrapMinlengthChecker;
  let wrrapLengthChecker;
  describe('maxlengthChecker', () => {
    test('should be defined', () => {
      expect(maxlengthChecker).toBeDefined();
    });

    describe('params', () => {
      beforeEach(() => {
        wrrapMaxlengthChecker = params => {
          maxlengthChecker(params)('abc');
        };
      });
      test('should throw if value not exist or undefined or null', () => {
        testPropTypes(wrrapMaxlengthChecker, 'value', 'isRequired');
      });
      test('should throw if value not number', () => {
        testPropTypes(wrrapMaxlengthChecker, 'value', 'number');
      });
      test('should not throw if value exist and number', () => {
        expect(() => {
          maxlengthChecker({ value: 3 })('abc');
        }).not.toThrow();
      });
    });

    describe('val', () => {
      test('undefined null or empty should return true', () => {
        expect(maxlengthChecker({ value: 3 })()).toBeTruthy();
        expect(maxlengthChecker({ value: 3 })(null)).toBeTruthy();
        expect(maxlengthChecker({ value: 3 })(undefined)).toBeTruthy();
        expect(maxlengthChecker({ value: 3 })('')).toBeTruthy();
      });
    });

    describe('params & val is valid', () => {
      test('val valid', () => {
        expect(maxlengthChecker({ value: 4 })('abc')).toBeTruthy();
        expect(maxlengthChecker({ value: 4 })(123)).toBeTruthy();
      });

      test('length val greate than value', () => {
        expect(maxlengthChecker({ value: 4 })('abcde')).toBeFalsy();
        expect(maxlengthChecker({ value: 4 })(12345)).toBeFalsy();
        expect(maxlengthChecker({ value: 4 })('12345')).toBeFalsy();
      });
    });
  });

  describe('minlengthChecker', () => {
    test('should be defined', () => {
      expect(minlengthChecker).toBeDefined();
    });

    describe('params', () => {
      beforeEach(() => {
        wrrapMinlengthChecker = params => {
          minlengthChecker(params)('abc');
        };
      });
      test('should throw if value not exist or undefined or null', () => {
        testPropTypes(wrrapMinlengthChecker, 'value', 'isRequired');
      });
      test('should throw if value not number', () => {
        testPropTypes(wrrapMinlengthChecker, 'value', 'number');
      });
      test('should not throw if value exist and number', () => {
        expect(() => {
          minlengthChecker({ value: 3 })('abc');
        }).not.toThrow();
      });
    });

    describe('val', () => {
      test('undefined null or empty should return true', () => {
        expect(minlengthChecker({ value: 3 })()).toBeTruthy();
        expect(minlengthChecker({ value: 3 })(null)).toBeTruthy();
        expect(minlengthChecker({ value: 3 })(undefined)).toBeTruthy();
        expect(minlengthChecker({ value: 3 })('')).toBeTruthy();
      });
    });

    describe('params & val is valid', () => {
      test('val valid', () => {
        expect(minlengthChecker({ value: 2 })('abc')).toBeTruthy();
        expect(minlengthChecker({ value: 2 })(123)).toBeTruthy();
      });

      test('length val less than value', () => {
        expect(minlengthChecker({ value: 8 })('abcde')).toBeFalsy();
        expect(minlengthChecker({ value: 8 })(12345)).toBeFalsy();
        expect(minlengthChecker({ value: 8 })('12345')).toBeFalsy();
      });
    });
  });

  describe('lengthChecker', () => {
    test('should be defined', () => {
      expect(lengthChecker).toBeDefined();
    });

    describe('params', () => {
      beforeEach(() => {
        wrrapLengthChecker = params => {
          lengthChecker(params)('abc');
        };
      });
      test('should throw if value not exist or undefined or null', () => {
        testPropTypes(wrrapLengthChecker, 'value', 'isRequired');
      });
      test('should throw if value not number', () => {
        testPropTypes(wrrapLengthChecker, 'value', 'number');
      });
      test('should not throw if value exist and number', () => {
        expect(() => {
          lengthChecker({ value: 3 })('abc');
        }).not.toThrow();
      });
    });

    describe('val', () => {
      test('undefined null or empty should return true', () => {
        expect(lengthChecker({ value: 3 })()).toBeTruthy();
        expect(lengthChecker({ value: 3 })(null)).toBeTruthy();
        expect(lengthChecker({ value: 3 })(undefined)).toBeTruthy();
        expect(lengthChecker({ value: 3 })('')).toBeTruthy();
      });
    });

    describe('params & val is valid', () => {
      test('val valid', () => {
        expect(lengthChecker({ value: 3 })('abc')).toBeTruthy();
        expect(lengthChecker({ value: 3 })(123)).toBeTruthy();
      });

      test('length val different than value', () => {
        expect(lengthChecker({ value: 4 })('abcde')).toBeFalsy();
        expect(lengthChecker({ value: 4 })(12345)).toBeFalsy();
        expect(lengthChecker({ value: 4 })('12345')).toBeFalsy();
      });
    });
  });
});
