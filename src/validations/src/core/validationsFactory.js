import { constructMessage } from 'validations/utils';
import fp from 'lodash/fp';

export function generateBasicValidation(settings) {
  return { ...settings };
}

export function generateConditionValidation(settings) {
  const { condition, validator } = settings;
  const validatorWrapper = (value, dependedObservables) => {
    return dependedObservables[condition] ? validator(value) : true;
  };
  return { ...settings, validator: validatorWrapper };
}

export function generateDependedValidation(settings) {
  const { params, validator, message } = settings;
  const validatorWrapper = (value, dependedObservables) => {
    const dependedParams = fp.mapValues(value =>
      dependedObservables[value].get()
    )(params);
    return validator(dependedParams)(value);
  };
  const messageWrapper = (value, dependedObservables) => {
    const dependedParams = fp.mapValues(value =>
      dependedObservables[value].get()
    )(params);
    return message(dependedParams);
  };
  return { ...settings, validator: validatorWrapper, message: messageWrapper };
}

export function generateRegexValidation(settings) {
  const validator = value => {
    return value.toString().match(settings.regex) ? true : false;
  };
  return { ...settings, validator };
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
