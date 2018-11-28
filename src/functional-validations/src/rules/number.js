import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import messages from 'validations/messages/number';
import {
  generateBasicValidation,
  generateRegexValidation
} from 'vm-validations/validationsFactory';
import validationsManager from 'vm-validations/ValidationsManager';

// TODO:
// decimal,
// onlyDecimal,
// signedNumber,
// decimalWithParam,
// range

export const number = assertParametersType(
  {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  },
  function number(params) {
    return generateBasicValidation({
      name: 'number',
      message: () => messages.number(),
      validator: val => !isNaN(parseFloat(val)) && !isNaN(val - 0),
      params
    });
  }
);

export const integer = assertParametersType(
  {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  },
  function integer(params) {
    return generateBasicValidation({
      name: 'integer',
      message: () => messages.integer(),
      validator: val => Number.isInteger(Number(val.toString())), //regex: /^(\d+){0,1}$/,
      params
    });
  }
);

export const decimal = assertParametersType(
  {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  },
  function decimal(params) {
    return generateRegexValidation({
      name: 'decimal',
      message: () => messages.integer(),
      regex: /^[0-9]+(\.[0-9]+)?$/,
      params
    });
  }
);

function greaterThanChecker(value) {
  return val => {
    return parseFloat(val) > parseFloat(value);
  };
}

export const greaterThan = assertParametersType(
  {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      compareToName: PropTypes.string,
      message: PropTypes.func
    })
  },
  function greaterThan(params) {
    const { value, compareToName } = params;
    return new validationsManager([
      number(params),
      generateBasicValidation({
        name: 'greaterThan',
        message: () => messages.greaterThan(compareToName || value),
        params,
        validator: greaterThanChecker(value)
      })
    ]);
  }
);

function lessThanChecker(value) {
  return val => {
    return parseFloat(val) < parseFloat(value);
  };
}

export const lessThan = assertParametersType(
  {
    params: PropTypes.shape({
      value: PropTypes.number.isRequired,
      compareToName: PropTypes.string
    })
  },
  function lessThan(params) {
    const { value, compareToName } = params;
    return generateBasicValidation({
      name: 'lessThan',
      message: () => messages.lessThan(compareToName || value),
      params,
      validator: lessThanChecker(value)
    });
  }
);

export function notZeroDigits(params) {
  return generateRegexValidation({
    name: 'notZeroDigits',
    message: () => messages.notZeroDigits(),
    regex: /^(\d+){0,1}$/, //TODO:!!
    params
  });
}
