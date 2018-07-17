import {
  generateBasicValidation
  // generateConditionValidation
} from 'validations/core/validationsFactory';
import messages from 'validations/messages/basic';
import {
  maxlengthChecker,
  minlengthChecker,
  requiredChecker,
  lengthChecker
} from 'validations/checkers/basic';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';

const paramsPropTypesRequiredValue = {
  params: PropTypes.shape({
    value: PropTypes.number.isRequired,
    message: PropTypes.func
  })
};

export function required(params = {}) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'required');
  let { message } = params;
  return generateBasicValidation({
    name: 'required',
    message: () => messages.required(),
    params,
    validator: requiredChecker()
  });
}

export function maxlength(params) {
  assertParametersType({ params }, paramsPropTypesRequiredValue, 'maxlength');
  let { value, message } = params;
  return generateBasicValidation({
    name: 'maxlength',
    message: () => messages.maxlength(value),
    params,
    validator: maxlengthChecker(params)
  });
}

export function minlength(params) {
  assertParametersType({ params }, paramsPropTypesRequiredValue, 'minlength');
  let { value, message } = params;
  return generateBasicValidation({
    name: 'minlength',
    message: () => messages.minlength(value),
    params,
    validator: minlengthChecker(params)
  });
}

export function length(params) {
  assertParametersType({ params }, paramsPropTypesRequiredValue, 'length');
  let { value, message } = params;
  return generateBasicValidation({
    name: 'length',
    message: () => messages.length(value),
    params,
    validator: lengthChecker(params)
  });
}

// equal //==
// equal //===
// notEqual
