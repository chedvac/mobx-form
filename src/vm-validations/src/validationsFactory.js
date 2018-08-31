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

export const generateRequiredValidation = assertParametersType(
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
  function generateRequiredValidation(settings) {
    const messageWrapper = () => {
      const message = _.get(settings, 'params.message', settings.message);
      return message();
    };

    return {
      ...settings,
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
    const charsPattern = settings.charsPattern || settings.regex;

    return generateBasicValidation({
      ...settings,
      validator,
      charsPattern
    });
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
    async function validator(value) {
      try {
        return await settings.request(value);
      } catch (err) {
        return false;
      }
    }
    return { ...settings, validator };
  }
);
