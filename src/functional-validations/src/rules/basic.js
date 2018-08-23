import {
  generateBasicValidation,
  generateRequiredValidation
} from 'vmValidations/validationsFactory';
import messages from 'validations/messages/basic';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';

function requiredChecker() {
  return val => {
    return val && val.length > 0;
  };
}

export const required = assertParametersType(
  {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  },
  function required(params = {}) {
    return generateRequiredValidation({
      name: 'required',
      message: () => messages.required(),
      params,
      validator: requiredChecker(),
      required: true
    });
  }
);

function maxlengthChecker(value) {
  return val => {
    return val.toString().length <= value;
  };
}

export const maxlength = assertParametersType(
  {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      message: PropTypes.func
    })
  },
  function maxlength(params = {}) {
    let { value } = params;
    return generateBasicValidation({
      name: 'maxlength',
      message: () => messages.maxlength(value),
      params,
      validator: maxlengthChecker(value),
      maxLength: value
    });
  }
);

function minlengthChecker(value) {
  return val => {
    return val.toString().length >= value;
  };
}

export const minlength = assertParametersType(
  {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      message: PropTypes.func
    })
  },
  function minlength(params = {}) {
    let { value } = params;
    return generateBasicValidation({
      name: 'minlength',
      message: () => messages.minlength(value),
      params,
      validator: minlengthChecker(value),
      minLength: value
    });
  }
);

function lengthChecker(value) {
  return val => {
    return val.toString().length === value;
  };
}

export const length = assertParametersType(
  {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      message: PropTypes.func
    })
  },
  function length(params = {}) {
    let { value } = params;
    return generateBasicValidation({
      name: 'length',
      message: () => messages.length(value),
      params,
      validator: lengthChecker(value),
      maxLength: value,
      minLength: value
    });
  }
);

//TODO:
// equal //==
// equal //===
// notEqual
