import PropTypes from 'prop-types';
import assertParametersType from 'core/typeVerifications';

export function requiredChecker() {
  return val => {
    return val && val.length > 0;
  };
}

const paramsPropTypes = {
  params: PropTypes.shape({
    value: PropTypes.number.isRequired
  })
};

export function maxlengthChecker(params = {}) {
  assertParametersType({ params }, paramsPropTypes, 'maxlengthChecker');
  let { value } = params;
  return val => {
    if (!val) {
      return true;
    }
    val = val.toString();
    return val.length <= value;
  };
}

export function minlengthChecker(params = {}) {
  assertParametersType({ params }, paramsPropTypes, 'maxlengthChecker');
  let { value } = params;
  return val => {
    if (!val) {
      return true;
    }
    val = val.toString();
    return val.length >= value;
  };
}

export function lengthChecker(params = {}) {
  assertParametersType({ params }, paramsPropTypes, 'maxlengthChecker');
  let { value } = params;
  return val => {
    if (!val) {
      return true;
    }
    val = val.toString();
    return val.length === value;
  };
}
