import { constructMessage } from 'validations/utils';
import fp from 'lodash/fp';

export function generateBasicValidation(settings) {
  // name, message, validator
  // optional: params (message)
  //TODO: check params
  const messageWrapper = value => {
    const message = settings.params
      ? settings.params.message || settings.message
      : settings.message;
    return message(value);
  };
  return { ...settings, message: messageWrapper };
}

// export function generateConditionValidation(settings) {
//   const { condition, validator } = settings;
//   const validatorWrapper = (value, dependedObservables) => {
//     return dependedObservables[condition] ? validator(value) : true;
//   };
//   return { ...settings, validator: validatorWrapper };
// }

// export function generateDependedValidation(settings) {
//   const { params, validator, message } = settings;
//   const dependedParams = (value, dependedObservables) =>
//     fp.mapValues(value => dependedObservables[value].get())(params);

//   const validatorWrapper = (value, dependedObservables) => {
//     return validator(dependedParams(value, dependedObservables))(value);
//   };

//   const messageWrapper = (value, dependedObservables) => {
//     return message(dependedParams(value, dependedObservables));
//   };
//   return generateBasicValidation({
//     ...settings,
//     validator: validatorWrapper,
//     message: messageWrapper
//   });
// }

export function generateRegexValidation(settings) {
  // name, message, validator
  // optional: params (message)
  const validator = value => {
    return value.toString().match(settings.regex) ? true : false;
  };
  return generateBasicValidation({ ...settings, validator });
}

export function generateAsyncValidation(settings) {
  const { name, message } = settings;
  async function validator(value, result) {
    try {
      await settings.request(value);
      result.isValid = true;
      result.message = '';
    } catch (err) {
      const error = err || '';
      result.isValid = false;
      result.message = error.error ? error.error : settings.message;
    }
  }
  return { ...settings, validator };
}
