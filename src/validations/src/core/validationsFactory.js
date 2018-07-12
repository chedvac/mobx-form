import assertParametersType from 'core/typeVerifications';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import _ from 'lodash';

const basicPropTypes = {
  settings: PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.func.isRequired,
    validator: PropTypes.func.isRequired,
    params: PropTypes.shape({
      message: PropTypes.func
    })
  })
};

const regexPropTypes = {
  settings: PropTypes.shape({
    regex: PropTypes.any.isRequired
  })
};

export function generateBasicValidation(settings) {
  assertParametersType({ settings }, basicPropTypes, 'generateBasicValidation');
  const messageWrapper = value => {
    const message = _.get(settings, 'params.message', settings.message);
    return message(value);
  };
  return { ...settings, message: messageWrapper };
}

export function generateRegexValidation(settings) {
  assertParametersType({ settings }, regexPropTypes, 'generateRegexValidation');
  const validator = value => {
    return value.toString().match(settings.regex) ? true : false;
  };
  const dataSchema = { pattern: settings.regex };
  return generateBasicValidation({ ...settings, validator, dataSchema });
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
