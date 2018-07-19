import {
  generateBasicValidation,
  generateRequiredValidation
} from 'validations/core/validationsFactory';
import messages from 'validations/messages/basic';
import PropTypes from 'prop-types';
import assertParametersType from 'core/typeVerifications';

const paramsPropTypesRequiredValue = {
  params: PropTypes.shape({
    value: PropTypes.number.isRequired,
    message: PropTypes.func
  })
};

function requiredChecker() {
  return val => {
    return val && val.length > 0;
  };
}

export function required(params = {}) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'required');
  return generateRequiredValidation({
    name: 'required',
    message: () => messages.required(),
    params,
    validator: requiredChecker(),
    dataSchema: { required: true }
  });
}

function maxlengthChecker(value) {
  return val => {
    return val.toString().length <= value;
  };
}
export function maxlength(params) {
  assertParametersType({ params }, paramsPropTypesRequiredValue, 'maxlength');
  let { value } = params;
  return generateBasicValidation({
    name: 'maxlength',
    message: () => messages.maxlength(value),
    params,
    validator: maxlengthChecker(value),
    dataSchema: { maxLength: value }
  });
}

function minlengthChecker(value) {
  return val => {
    return val.toString().length >= value;
  };
}
export function minlength(params) {
  assertParametersType({ params }, paramsPropTypesRequiredValue, 'minlength');
  let { value } = params;
  return generateBasicValidation({
    name: 'minlength',
    message: () => messages.minlength(value),
    params,
    validator: minlengthChecker(value),
    dataSchema: { minLength: value }
  });
}

function lengthChecker(value) {
  return val => {
    return val.toString().length === value;
  };
}
export function length(params) {
  assertParametersType({ params }, paramsPropTypesRequiredValue, 'length');
  let { value } = params;
  return generateBasicValidation({
    name: 'length',
    message: () => messages.length(value),
    params,
    validator: lengthChecker(value),
    dataSchema: { length: value }
  });
}

//TODO:
// equal //==
// equal //===
// notEqual
