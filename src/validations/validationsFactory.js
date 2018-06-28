import { constructMessage } from './../validations/utils';

// settings = validation definitions (name, message)
// params = (message, condition) params from developer to override default definitions like message, or validation that need params like min,max..
function generateBasicValidation(settings, params, validator) {
  Object.assign(settings, params);
  //TODO handle schemaData
  const { name, message, condition } = settings;
  const validatorWrapper = (v, observable) => {
    return (
      (condition && condition(v) && validator(v, observable)) ||
      (!condition && validator(v, observable))
    );
  };

  return { name, validator: validatorWrapper, message, params };
}
function generateDependedValidation(settings, params, validator) {
  Object.assign(settings, params);
  //TODO handle schemaData
  const { name, message, condition } = settings;
  const validatorWrapper = (value, dependedObservables) => {
    const dependedParams = {};
    Object.entries(params).forEach(([key, value]) => {
      dependedParams[key] = dependedObservables[value].get();
    });
    return validator(dependedParams)(value);
  };
  return { name, validator: validatorWrapper, message, params };
}
function generateRegexValidation(settings, params) {
  const validator = v => {
    return v.toString().match(settings.regex) ? true : false;
  };
  return generateBasicValidation(settings, params, validator);
}

function generateAsyncValidation(settings, params) {
  async function validator(v, observable) {
    try {
      const result = await settings.request(v);
      observable.isValid = true;
      observable.message = '';
    } catch (err) {
      const error = err || '';
      observable.isValid = false;
      observable.message = error.error
        ? error.error
        : settings.message || 'deafult error';
    }
  }
  return generateBasicValidation(settings, params, validator);
}

export default {
  generateBasicValidation,
  generateRegexValidation,
  generateDependedValidation,
  generateAsyncValidation
};
