import ValidationManager from '../validationsManager';
import { greaterThan } from 'validations/rules/number';
import { maxlength, minlength, required } from 'validations/rules/basic';
import { hebrew } from 'validations/rules/text';
import { isObservableProp } from 'mobx';
let validationManagerInst, validationArray, errorMessage;

beforeEach(() => {
  validationArray = [
    maxlength({ value: 15 }),
    minlength({ value: 2 }),
    greaterThan({ value: 20 })
  ];
});
describe('ValidationManager', () => {
  describe('constructor', () => {
    describe('validations params', () => {
      test('validations params not mandatory', () => {
        expect(() => {
          validationManagerInst = new ValidationManager();
        }).not.toThrow();
      });
      test('validations params shuld be array', () => {
        expect(() => {
          validationManagerInst = new ValidationManager('dd');
        }).toThrow();
        expect(() => {
          validationManagerInst = new ValidationManager(validationArray);
        }).not.toThrow();
      });
    });

    describe('set property', () => {
      beforeEach(() => {
        validationManagerInst = new ValidationManager(validationArray);
      });
      test('set validation array to validations property', () => {
        expect(validationManagerInst.validations).toBeDefined();
      });
      test('concat validationManager validation', () => {
        const greaterThanObj = greaterThan({ value: 20 });
        validationManagerInst = new ValidationManager([greaterThanObj]);
        expect(validationManagerInst.validations.length).toEqual(
          greaterThanObj.validations.length
        );
      });

      test('set pattern property', () => {
        //איך בודקם שהכניס רק regex
        expect(typeof validationManagerInst.pattern).toBeDefined();
      });

      test('set value if validation array contain property', () => {
        const maxlengthVal = 15,
          minlengthVal = 2;
        validationManagerInst = new ValidationManager([
          maxlength({ value: maxlengthVal }),
          minlength({ value: minlengthVal }),
          required()
        ]);
        expect(validationManagerInst.maxlength).toEqual(maxlengthVal);
        expect(validationManagerInst.minlength).toEqual(minlengthVal);
        expect(validationManagerInst.required).toEqual(true);
      });

      test('set undefined if validation array not contain property', () => {
        validationManagerInst = new ValidationManager([]);
        expect(validationManagerInst.maxlength).toBeUndefined();
        expect(validationManagerInst.minlength).toBeUndefined();
        expect(validationManagerInst.required).toBeUndefined();
      });
    });
  });

  describe('validateCharsPattern', () => {
    beforeEach(() => {
      const hebrewVlidate = hebrew();
      errorMessage = { hebrew: 'error message....' };
      //
      hebrewVlidate.message = jest.fn(() => errorMessage);
      validationManagerInst = new ValidationManager([hebrewVlidate]);
    });
    test('faild char pattern', () => {
      const result = {
        message: errorMessage.hebrew,
        isValid: false
      };
      expect(validationManagerInst.validateCharsPattern('abc')).toEqual(result);
    });
    test('success char pattern', () => {
      const result = {
        message: '',
        isValid: true
      };
      expect(validationManagerInst.validateCharsPattern('אבג')).toEqual(result);
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      const hebrewVlidate = hebrew();
      errorMessage = { hebrew: 'error message....' };
      hebrewVlidate.message = jest.fn(() => errorMessage);
      validationManagerInst = new ValidationManager([hebrewVlidate]);
    });
    test('faild char pattern', () => {
      const result = {
        message: errorMessage.hebrew,
        isValid: false
      };
      expect(validationManagerInst.validateCharsPattern('abc')).toEqual(result);
    });
    test('success char pattern', () => {
      const result = {
        message: '',
        isValid: true
      };
      expect(validationManagerInst.validateCharsPattern('אבג')).toEqual(result);
    });
  });
});
