import validationFactory from "../../validations/validationsFactory";

describe("generateBasicValidation", () => {
  let settings, successValidator, failedValidator;
  beforeEach(() => {
    settings = { name: "myValidation", message: () => "custom error" };
    successValidator = () => {
      return true;
    };
    failedValidator = () => {
      return true;
    };
  });

  test("should be defined", () => {
    expect(validationFactory.generateBasicValidation).toBeDefined();
  });

  describe("params", () => {
    describe("settings", () => {
      test("throw if not object with name and message properties", () => {
        expect(() => {
          validationFactory.generateBasicValidation(undefined);
        }).toThrowError("settings must be object include name & message");
        expect(() => {
          validationFactory.generateBasicValidation({});
        }).toThrowError("settings must be object include name & message");
        expect(() => {
          validationFactory.generateBasicValidation({
            name: "validation name"
          });
        }).toThrowError("settings must be object include name & message");
        expect(() => {
          validationFactory.generateBasicValidation({
            message: "custom message"
          });
        }).toThrowError("settings must be object include name & message");
      });

      test("throw if message is not function", () => {
        expect(() => {
          validationFactory.generateBasicValidation({
            name: "validation name",
            message: "custom message"
          });
        }).toThrowError("settings.message must be function");
      });
    });
    describe("validator", () => {
      test("throw if not function", () => {
        expect(() => {
          validationFactory.generateBasicValidation(settings);
        }).toThrowError("validator must be function");
        expect(() => {
          validationFactory.generateBasicValidation(settings, "string");
        }).toThrowError("validator must be function");
      });
    });
  });

  test("should return object contain 'message, validator, name, optionalParams' properties", () => {
    expect(
      validationFactory.generateBasicValidation(settings, successValidator)
    ).toHaveProperty("message");
    expect(
      validationFactory.generateBasicValidation(settings, successValidator)
    ).toHaveProperty("validator");
    expect(
      validationFactory.generateBasicValidation(settings, successValidator)
    ).toHaveProperty("name");
    expect(
      validationFactory.generateBasicValidation(settings, successValidator)
    ).toHaveProperty("optionalParams");
  });

  test("name equal to settings.name", () => {
    expect(
      validationFactory.generateBasicValidation(settings, successValidator)
    ).toHaveProperty("name", settings.name);
  });

  test("message equal to settings.message", () => {
    const validation = validationFactory.generateBasicValidation(
      settings,
      successValidator
    );
    expect(validation.message()).toEqual(settings.message());
  });

  test("optionalParams sent", () => {
    const optionalMessage = () => "my message";
    const validation = validationFactory.generateBasicValidation(
      settings,
      successValidator,
      { message: optionalMessage }
    );
    expect(validation.message()).toEqual("my message");
  });

  describe("validator", () => {
    test("should return true if condition not set", () => {
      const regexValidation = validationFactory.generateBasicValidation(
        settings,
        successValidator
      );
      expect(regexValidation.validator("abc").isValid).toBeTruthy();
    });
    test("should return false if condition is false", () => {
      const regexValidation = validationFactory.generateBasicValidation(
        settings,
        successValidator,
        {
          condition: () => {
            return false;
          }
        }
      );
      expect(regexValidation.validator("abc").isValid).toBeFalsy();
    });
    test("should return true if condition is true", () => {
      const regexValidation = validationFactory.generateBasicValidation(
        settings,
        successValidator,
        {
          condition: () => {
            return true;
          }
        }
      );
      expect(regexValidation.validator("abc").isValid).toBeTruthy();
    });
  });
});

describe("generateRegexValidation", () => {
  const settings = { name: "myValidation", message: "custom error" };
  const validator = () => {
    return true;
  };
  test("should be defined", () => {
    expect(validationFactory.generateRegexValidation).toBeDefined();
  });

  describe("params", () => {
    describe("settings", () => {
      test("throw if not object with regex property", () => {
        expect(() => {
          validationFactory.generateRegexValidation(undefined);
        }).toThrowError("settings must be object contain regex");
        expect(() => {
          validationFactory.generateRegexValidation({});
        }).toThrowError("settings must be object contain regex");
      });
    });
  });

  describe("validator", () => {
    test("should return false if not match to regex", () => {
      const regexValidation = validationFactory.generateRegexValidation({
        regex: /^[0-9].*$/,
        name: "my regex validation",
        message: () => "not match to regex"
      });
      expect(regexValidation.validator("abc").isValid).toBeFalsy();
    });
    test("should return true if match to regex", () => {
      const regexValidation = validationFactory.generateRegexValidation({
        regex: /^[0-9].*$/,
        name: "my regex validation",
        message: () => "not match to regex"
      });
      expect(regexValidation.validator("123").isValid).toBeTruthy();
    });
  });
});

describe("generateAsyncValidation", () => {
  const settings = { name: "myValidation", message: "custom error" };
  const validator = () => {
    return true;
  };
  test("should be defined", () => {
    expect(validationFactory.generateAsyncValidation).toBeDefined();
  });

  describe("params", () => {
    describe("settings", () => {
      test("throw if not object with regex property", () => {
        expect(() => {
          validationFactory.generateAsyncValidation(undefined);
        }).toThrowError("settings must be object contain request function");
        expect(() => {
          validationFactory.generateAsyncValidation({ request: "function" });
        }).toThrowError("settings must be object contain request function");
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
  //     asyncValidation = validationFactory.generateAsyncValidation(settings);
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
