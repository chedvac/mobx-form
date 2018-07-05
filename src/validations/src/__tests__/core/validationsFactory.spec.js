import {
  generateBasicValidation,
  generateRegexValidation,
  generateAsyncValidation
} from '../../core/validationsFactory';

describe('generateBasicValidation', () => {
  let settings, successValidator, failedValidator;
  beforeEach(() => {
    settings = { name: 'myValidation', message: () => 'custom error' };
    successValidator = () => {
      return true;
    };
    failedValidator = () => {
      return true;
    };
  });

  test('should be defined', () => {
    expect(generateBasicValidation).toBeDefined();
  });

  describe('params', () => {
    describe('settings', () => {
      test('throw if not object with name and message properties', () => {
        expect(() => {
          generateBasicValidation(undefined);
        }).toThrow();
        expect(() => {
          generateBasicValidation({});
        }).toThrow();
        expect(() => {
          generateBasicValidation({
            name: 'validation name'
          });
        }).toThrow();
        expect(() => {
          generateBasicValidation({
            message: 'custom message'
          });
        }).toThrow();
      });

      test('throw if message is not function', () => {
        expect(() => {
          generateBasicValidation({
            name: 'validation name',
            message: 'custom message'
          });
        }).toThrow();
      });
    });
    describe('validator', () => {
      test('throw if not function', () => {
        expect(() => {
          generateBasicValidation(settings);
        }).toThrow();
        expect(() => {
          generateBasicValidation(settings, 'string');
        }).toThrow();
      });
    });
  });

  test("should return object contain 'message, validator, name, optionalParams' properties", () => {
    expect(generateBasicValidation(settings, successValidator)).toHaveProperty(
      'message'
    );
    expect(generateBasicValidation(settings, successValidator)).toHaveProperty(
      'validator'
    );
    expect(generateBasicValidation(settings, successValidator)).toHaveProperty(
      'name'
    );
    expect(generateBasicValidation(settings, successValidator)).toHaveProperty(
      'optionalParams'
    );
  });

  test('name equal to settings.name', () => {
    expect(generateBasicValidation(settings, successValidator)).toHaveProperty(
      'name',
      settings.name
    );
  });

  test('message equal to settings.message', () => {
    const validation = generateBasicValidation(settings, successValidator);
    expect(validation.message()).toEqual(settings.message());
  });

  test('optionalParams sent', () => {
    const optionalMessage = () => 'my message';
    const validation = generateBasicValidation(settings, successValidator, {
      message: optionalMessage
    });
    expect(validation.message()).toEqual('my message');
  });

  describe('validator', () => {
    test('should return true if condition not set', () => {
      const regexValidation = generateBasicValidation(
        settings,
        successValidator
      );
      expect(regexValidation.validator('abc').isValid).toBeTruthy();
    });
    test('should return false if condition is false', () => {
      const regexValidation = generateBasicValidation(
        settings,
        successValidator,
        {
          condition: () => {
            return false;
          }
        }
      );
      expect(regexValidation.validator('abc').isValid).toBeFalsy();
    });
    test('should return true if condition is true', () => {
      const regexValidation = generateBasicValidation(
        settings,
        successValidator,
        {
          condition: () => {
            return true;
          }
        }
      );
      expect(regexValidation.validator('abc').isValid).toBeTruthy();
    });
  });
});

describe('generateRegexValidation', () => {
  const settings = { name: 'myValidation', message: 'custom error' };
  const validator = () => {
    return true;
  };
  test('should be defined', () => {
    expect(generateRegexValidation).toBeDefined();
  });

  describe('params', () => {
    describe('settings', () => {
      test('throw if not object with regex property', () => {
        expect(() => {
          generateRegexValidation(undefined);
        }).toThrow();
        expect(() => {
          generateRegexValidation({});
        }).toThrow();
      });
    });
  });

  describe('validator', () => {
    test('should return false if not match to regex', () => {
      const regexValidation = generateRegexValidation({
        regex: /^[0-9].*$/,
        name: 'my regex validation',
        message: () => 'not match to regex'
      });
      expect(regexValidation.validator('abc').isValid).toBeFalsy();
    });
    test('should return true if match to regex', () => {
      const regexValidation = generateRegexValidation({
        regex: /^[0-9].*$/,
        name: 'my regex validation',
        message: () => 'not match to regex'
      });
      expect(regexValidation.validator('123').isValid).toBeTruthy();
    });
  });
});

describe('generateAsyncValidation', () => {
  const settings = { name: 'myValidation', message: 'custom error' };
  const validator = () => {
    return true;
  };
  test('should be defined', () => {
    expect(generateAsyncValidation).toBeDefined();
  });

  describe('params', () => {
    describe('settings', () => {
      test('throw if not object with regex property', () => {
        expect(() => {
          generateAsyncValidation(undefined);
        }).toThrow();
        expect(() => {
          generateAsyncValidation({ request: 'function' });
        }).toThrow();
      });
    });
  });

  // describe("validator", () => {
  //   let mockRequest, settings, asyncValidation, observale;
  //   beforeEach(() => {
  //     mockRequest = async v => {
  //       try {
  //         const result = v === "valid";
  //         return result;
  //       } catch (ex) {
  //         throw { error: "failed" };
  //       }
  //     };
  //     settings = {
  //       name: "myValidation",
  //       message: () => "custom error",
  //       request: mockRequest
  //     };
  //     asyncValidation = generateAsyncValidation(settings);
  //     observale = {};
  //   });
  //   test("should return true if condition not set", () => {
  //     expect.assertions(1);
  //     return asyncValidation.validator("valid", observale).then(data => {
  //       expect(observale.isValid).toBeTruthy();
  //     });
  //   });
  //   test("should return false if condition not set", () => {
  //     expect.assertions(1);
  //     return asyncValidation.validator("not valid", observale).then(data => {
  //       expect(observale.isValid).toBeFalsy();
  //     });
  //   });
  // });
});
