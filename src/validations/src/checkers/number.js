import PropTypes from 'prop-types';
import assertParametersType from 'core/typeVerifications';

const paramsPropTypes = {
  params: PropTypes.shape({
    value: PropTypes.number.isRequired
  })
};

export function greaterThanChecker(params) {
  assertParametersType({ params }, paramsPropTypes, 'greaterThanChecker');
  let { value } = params;
  return val => {
    if (!value || isNaN(value) || isNaN(val)) {
      return true;
    }

    return parseFloat(val) > parseFloat(value);
  };
}

export function lessThanChecker(params) {
  assertParametersType({ params }, paramsPropTypes, 'lessThanChecker');
  let { value } = params;
  return val => {
    if (!value || isNaN(value.toString())) {
      return true;
    }
    value = parseFloat(value);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val < value;
  };
}
