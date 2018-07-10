import assertParametersType from 'core/typeVerifications';
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
  return generateBasicValidation({
    name: 'greaterThan',
    message: () => messages.greaterThan(compareToName || value),
    params,
    validator: greaterThanChecker(params)
  });
}

export function lessThan(params) {
  let { number, compareToName } = params;
  return generateBasicValidation({
    name: 'lessThan',
    message: () => messages.lessThan(compareToName || number),
    params,
    validator: lessThanChecker(params)
  });
}

// export function dependedGreaterThan(params) {
//   return generateDependedValidation({
//     name: 'dependedGreaterThan',
//     message: messages.greaterThan,
//     params,
//     validator: greaterThanChecker
//   });
// }

// export function dependedLessThan(params) {
//   return generateDependedValidation({
//     name: 'dependedLessThan',
//     message: messages.lessThan,
//     params,
//     validator: lessThanChecker
//   });
// }
