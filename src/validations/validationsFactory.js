import { constructMessage } from "./../validations/utils";

function checkParams(settings, validator) {
  if (
    !(
      typeof settings === "object" &&
      "name" in settings &&
      "message" in settings
    )
  ) {
    throw "settings must be object include name & message";
  }
  if (typeof settings.message !== "function") {
    throw `validation: ${settings.name} settings.message must be function`;
  }
  if (typeof validator !== "function") {
    throw "validator must be function";
  }
}
// settings = validation definitions (name, message)
// params = (message, condition) params from developer to override default definitions like message, or validation that need params like min,max..
function generateBasicValidation(settings, validator, optionalParams = {}) {
  checkParams(settings, validator);
  Object.assign(settings, optionalParams);
  //TODO handle schemaData
  const { name, message, condition } = settings;
  const messageWrapper = v => {
    return settings.message(v, optionalParams);
  };
  const validatorWrapper = (v, observable) => {
    if (!v) {
      return { isValid: true, message: "" };
    }
    const conditionResult = condition ? condition(v) : true;
    if (conditionResult) {
      const validationResult = validator(v, observable);
      if (validationResult.hasOwnProperty("isValid")) {
        return validationResult;
      } else {
        return { isValid: validationResult, message: messageWrapper() };
      }
    }
    return { isValid: false, message: "" };
    // if (
    //   (condition && condition(v) && validator(v, observable)) ||
    //   (!condition && validator(v, observable))
    // ) {
    //   return { isValid: true, message: "" };
    // } else {
    //   return { isValid: false, message: messageWrapper() };
    // }
  };

  return {
    name,
    validator: validatorWrapper,
    message: messageWrapper,
    optionalParams
  };
}

function generateRegexValidation(settings, optionalParams) {
  if (!(typeof settings === "object" && "regex" in settings)) {
    throw "settings must be object contain regex";
  }
  const validator = v => {
    var regex = new RegExp(settings.regex);
    return regex.test(v);
  };
  return generateBasicValidation(settings, validator, optionalParams);
}

function generateAsyncValidation(settings, optionalParams) {
  if (
    !(typeof settings === "object" && typeof settings.request === "function")
  ) {
    throw "settings must be object contain request function";
  }
  async function validator(v, observable) {
    try {
      const result = await settings.request(v);
      observable.isValid = result ? true : false;
      observable.message = result ? "" : settings.message();
    } catch (err) {
      const error = err || "";
      observable.isValid = false;
      observable.message = error.error
        ? error.error
        : settings.message || "default error";
    }
  }
  return generateBasicValidation(settings, validator, optionalParams);
}

function generateComplexValidation(settings, validationsArray, optionalParams) {
  const validator = v => {
    const failed = validationsArray.find(validation => {
      return !validation.validator(v).isValid;
    });
    return failed
      ? { isValid: false, message: failed.message() }
      : { isValid: true, message: "" };
  };

  const message = v => {
    const failed = validationsArray.find(validation => {
      return !validation.validator(v);
    });
    return failed ? failed.message(v) : "";
  };
  settings.message = message;
  return generateBasicValidation(settings, validator, optionalParams);
}

export default {
  generateBasicValidation,
  generateComplexValidation,
  generateRegexValidation,
  generateAsyncValidation
};
