import ValidationManager from 'vm-validations/ValidationsManager';
import { greaterThan } from 'validations/rules/number';
import { maxlength, minlength, required } from 'validations/rules/basic';
import { hebrew } from 'validations/rules/text';
import { isObservableProp } from 'mobx';
let validationManagerInst, errorMessage;

const validationArray = [
  maxlength({ value: 15 }),
  minlength({ value: 2 }),
  greaterThan({ value: 20 })
];

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
    beforeAll(() => {
      validationManagerInst = new ValidationManager(validationArray);
      errorMessage = { hebrew: 'error message....' };
      for (const item of validationManagerInst.validations) {
        item.validator = jest.fn().mockReturnValue(false);
        item.message = jest.fn().mockReturnValue(errorMessage);
      }
    });

    test('is async', () => {
      expect(validationManagerInst.validate[Symbol.toStringTag]).toEqual(
        'AsyncFunction'
      );
    });
    test('call validations.validator until first fail', async () => {
      await validationManagerInst.validate('abc');
      expect(
        validationManagerInst.validations[0].validator
      ).toHaveBeenCalledWith('abc');
      expect(
        validationManagerInst.validations[1].validator
      ).not.toHaveBeenCalled();
    });
    test('return object contains isValid', async () => {
      expect(await validationManagerInst.validate('abc')).toEqual(
        expect.objectContaining({
          isValid: false
        })
      );
    });
    test('return object contains message', async () => {
      expect(await validationManagerInst.validate('abc')).toEqual(
        expect.objectContaining({
          message: errorMessage.hebrew
        })
      );
    });
  });
  describe('validateMultiResults', () => {
    beforeAll(() => {
      validationManagerInst = new ValidationManager(validationArray);
      errorMessage = { hebrew: 'error message....' };
      for (const item of validationManagerInst.validations) {
        item.validator = jest.fn().mockReturnValue(false);
        item.message = jest.fn().mockReturnValue(errorMessage);
      }
    });

    test('is async', () => {
      expect(
        validationManagerInst.validateMultiResults[Symbol.toStringTag]
      ).toEqual('AsyncFunction');
    });
    test('call all validations', async () => {
      await validationManagerInst.validateMultiResults('abc');
      for (const item of validationManagerInst.validations) {
        expect(item.validator).toHaveBeenCalledWith('abc');
      }
    });
    test('return object contains isValid', async () => {
      expect(await validationManagerInst.validateMultiResults('abc')).toEqual(
        expect.objectContaining({
          isValid: false
        })
      );
    });
    test('return object contains messages', async () => {
      expect(await validationManagerInst.validateMultiResults('abc')).toEqual(
        expect.objectContaining({
          messages: [
            errorMessage.hebrew,
            errorMessage.hebrew,
            errorMessage.hebrew,
            errorMessage.hebrew
          ]
        })
      );
    });
  });
});
