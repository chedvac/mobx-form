import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

import messages from 'validations/messages/number';
import {
  generateBasicValidation
  // generateDependedValidation
} from 'validations/core/validationsFactory';
import {
  greaterThanChecker,
  lessThanChecker
} from 'validations/checkers/number';
import { generateRegexValidation } from '../core/validationsFactory';
import validationsManager from '../core/validationsManager';

// TODO:
// integer,
// number,
// decimal,
// onlyDecimal,
// signedNumber,
// decimalWithParam,
// range

export function greaterThan(params) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      compareToName: PropTypes.string,
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'greaterThan');
  let { value, compareToName } = params;
  return new validationsManager([
    number(params),
    generateBasicValidation({
      name: 'greaterThan',
      message: () => messages.greaterThan(compareToName || value),
      params,
      validator: greaterThanChecker(params)
    })
  ]);
}

export function lessThan(params) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      compareToName: PropTypes.string
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'lessThan');
  let { number, compareToName } = params;
  return generateBasicValidation({
    name: 'lessThan',
    message: () => messages.lessThan(compareToName || number),
    params,
    validator: lessThanChecker(params)
  });
}

export function number(params) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'number');
  return generateBasicValidation({
    name: 'number',
    message: () => messages.number(),
    validator: val => !isNaN(parseFloat(val)) && !isNaN(val - 0),
    params
  });
}

export function integer(params) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'integer');
  return generateBasicValidation({
    name: 'integer',
    message: () => messages.integer(),
    validator: val => Number.isInteger(val), //regex: /^(\d+){0,1}$/,
    params
  });
}

export function notZeroDigits(params) {
  return generateRegexValidation({
    name: 'notZeroDigits',
    message: () => messages.notZeroDigits(),
    regex: /^(\d+){0,1}$/, //TODO:!!
    params
  });
}
