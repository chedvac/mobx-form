import assertParametersType from 'utils/typeVerifications';
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

  const validatorWrapper = value => {
    if (!value) {
      return true;
    }
    return settings.validator(value);
  };
  return { ...settings, validator: validatorWrapper, message: messageWrapper };
}

export function generateRegexValidation(settings) {
  assertParametersType({ settings }, regexPropTypes, 'generateRegexValidation');
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
      result.isValid = false;
      result.message = err.error || settings.message;
    }
  }
  return { ...settings, validator };
}
