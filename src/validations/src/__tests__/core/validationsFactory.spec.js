import {
  generateBasicValidation,
  generateRegexValidation,
  generateAsyncValidation
} from '../../core/validationsFactory';

describe('generateBasicValidation', () => {
  let settings, basicValidation;
  beforeEach(() => {
    settings = {
      name: 'myValidation',
      message: () => 'custom error',
      validator: v => v === 'valid'
    };
    basicValidation = generateBasicValidation(settings);
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
  test('should return object', () => {
    expect(typeof generateBasicValidation(settings)).toBe('object');
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
      expect(basicValidation.validator('')).toBeTruthy();
      expect(basicValidation.validator(null)).toBeTruthy();
      expect(basicValidation.validator(undefined)).toBeTruthy();
      expect(basicValidation.validator(false)).toBeTruthy();
      expect(basicValidation.validator('false')).not.toBeTruthy();
    });
    test('should return validator result', () => {
      expect(basicValidation.validator('valid')).toBeTruthy();
      expect(basicValidation.validator('not valid')).toBeFalsy();
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
  test('should return object', () => {
    expect(typeof generateRegexValidation(regexSettings)).toBe('object');
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

// describe('generateAsyncValidation', () => {
//   let asyncSettings;
//   beforeEach(() => {
//     asyncSettings = {
//       name: 'async validation',
//       message: () => 'failed request',
//       request: v => v === 'valid'
//     };
//   });

//   test('should be defined', () => {
//     expect(generateAsyncValidation).toBeDefined();
//   });

//   describe('settings', () => {
//     test('throw if not settings.request', () => {
//       expect(() => {
//         generateAsyncValidation({
//           name: 'myValidation',
//           message: () => 'custom error'
//         });
//       }).toThrow();
//     });
//   });
//   test('should return object', () => {
//     expect(typeof generateAsyncValidation(asyncSettings)).toBe('object');
//   });

//   describe('validator', () => {
//     test('should update', () => {
//       expect(
//         generateRegexValidation(asyncSettings).validator('valid')
//       ).toBeTruthy();
//     });

//     test('should return false if not match to regex', () => {
//       expect(
//         generateRegexValidation(asyncSettings).validator('abc')
//       ).toBeFalsy();
//     });
//   });
// });
