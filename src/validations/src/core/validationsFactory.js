import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import _ from 'lodash';

export const generateBasicValidation = assertParametersType(
  {
    settings: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.func.isRequired,
      validator: PropTypes.func.isRequired,
      params: PropTypes.shape({
        message: PropTypes.func
      })
    })
  },
  function generateBasicValidation(settings) {
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
    return {
      ...settings,
      validator: validatorWrapper,
      message: messageWrapper
    };
  }
);

export const generateRegexValidation = assertParametersType(
  {
    settings: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.func.isRequired,
      regex: PropTypes.any.isRequired,
      params: PropTypes.shape({
        message: PropTypes.func
      })
    })
  },
  function generateRegexValidation(settings) {
    const validator = value => value.toString().match(settings.regex);

    return generateBasicValidation({ ...settings, validator });
  }
);

export const generateAsyncValidation = assertParametersType(
  {
    settings: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.func.isRequired,
      request: PropTypes.func.isRequired,
      params: PropTypes.shape({
        message: PropTypes.func
      })
    })
  },
  function generateAsyncValidation(settings) {
    const { message } = settings;
    async function validator(value, result) {
      try {
        await settings.request(value);
        result.isValid = true;
        result.message = '';
      } catch (err) {
        result.isValid = false;
        result.message = err.error || message;
      }
    }
    return { ...settings, validator };
  }
);
