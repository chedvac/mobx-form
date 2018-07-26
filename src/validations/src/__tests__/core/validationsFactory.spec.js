import {
  generateBasicValidation,
  generateRegexValidation,
  generateAsyncValidation
} from '../../core/validationsFactory';

describe('generateBasicValidation', () => {
  let settings, successValidator, failedValidator;
  beforeEach(() => {
    settings = {
      name: 'myValidation',
      message: () => 'custom error',
      validator: () => true
    };
    successValidator = () => {
      return true;
    };
    failedValidator = () => {
      return false;
    };
  });

  test('should be defined', () => {
    expect(generateBasicValidation).toBeDefined();
  });

  describe('settings', () => {
    test('throw if settings.name is not string', () => {
      expect(() => {
        generateBasicValidation({
          message: () => 'message',
          validator: () => true
        });
      }).toThrow();
      expect(() => {
        generateBasicValidation({
          name: () => 'string',
          message: () => 'message',
          validator: () => true
        });
      }).toThrow();
    });

    test('throw if settings.message is not function', () => {
      expect(() => {
        generateBasicValidation({
          name: 'validation name',
          validator: () => true
        });
      }).toThrow();
      expect(() => {
        generateBasicValidation({
          name: 'validation name',
          message: 'custom message',
          validator: () => true
        });
      }).toThrow();
    });

    test('throw if settings.validator is not function', () => {
      expect(() => {
        generateBasicValidation({
          name: 'validation name',
          message: () => 'custom message'
        });
      }).toThrow();
      expect(() => {
        generateBasicValidation({
          name: 'validation name',
          message: () => 'custom message',
          validator: true
        });
      }).toThrow();
    });
  });
  test("should return object contain 'message, validator, name' properties", () => {
    expect(generateBasicValidation(settings)).toHaveProperty('message');
    expect(generateBasicValidation(settings)).toHaveProperty('validator');
    expect(generateBasicValidation(settings)).toHaveProperty('name');
  });

  describe('name', () => {
    test('should equal to settings.name', () => {
      expect(generateBasicValidation(settings)).toHaveProperty(
        'name',
        settings.name
      );
    });
  });

  describe('message', () => {
    test('params.message not sent should equal to settings.message', () => {
      const validation = generateBasicValidation(settings);
      expect(validation.message()).toEqual(settings.message());
    });
    test('should equal to params.message if sent', () => {
      const optionalMessage = () => 'my message';
      const validation = generateBasicValidation({
        ...settings,
        params: { message: optionalMessage }
      });
      expect(validation.message()).toEqual('my message');
    });
    test('should throw if params.message is not function', () => {
      expect(() => {
        generateBasicValidation({
          ...settings,
          params: { message: 'my message' }
        });
      }).toThrow();
    });
  });

  describe('validator', () => {
    test('sholuld return true if value undefined, null or empty', () => {
      expect(
        generateBasicValidation({
          ...settings,
          validator: successValidator
        }).validator('')
      ).toBeTruthy();
      expect(
        generateBasicValidation({
          ...settings,
          validator: successValidator
        }).validator(null)
      ).toBeTruthy();
      expect(
        generateBasicValidation({
          ...settings,
          validator: successValidator
        }).validator(undefined)
      ).toBeTruthy();
    });
    test('should return validator result', () => {
      expect(
        generateBasicValidation({
          ...settings,
          validator: successValidator
        }).validator('valid')
      ).toBeTruthy();
      expect(
        generateBasicValidation({
          ...settings,
          validator: failedValidator
        }).validator('not valid')
      ).toBeFalsy();
    });
  });
});

describe('generateRegexValidation', () => {
  let regexSettings;
  beforeEach(() => {
    regexSettings = {
      name: 'regex validation',
      message: () => 'no match to regex',
      regex: /^[0-9].*$/
    };
  });

  test('should be defined', () => {
    expect(generateRegexValidation).toBeDefined();
  });

  describe('settings', () => {
    test('throw if not settings.regex', () => {
      expect(() => {
        generateRegexValidation({
          name: 'myValidation',
          message: () => 'custom error'
        });
      }).toThrow();
    });
  });
  test("should return object contain 'message, validator, name, regex, dataSchema' properties", () => {
    expect(generateRegexValidation(regexSettings)).toHaveProperty('message');
    expect(generateRegexValidation(regexSettings)).toHaveProperty('validator');
    expect(generateRegexValidation(regexSettings)).toHaveProperty('name');
    expect(generateRegexValidation(regexSettings)).toHaveProperty('regex');
    expect(generateRegexValidation(regexSettings)).toHaveProperty('dataSchema');
  });

  describe('validator', () => {
    test('should return true if match to regex', () => {
      expect(
        generateRegexValidation(regexSettings).validator('123')
      ).toBeTruthy();
    });

    test('should return false if not match to regex', () => {
      expect(
        generateRegexValidation(regexSettings).validator('abc')
      ).toBeFalsy();
    });
  });
});
