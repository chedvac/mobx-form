import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import validationState from 'vm-validations/validationState';

const concatValidationArray = assertParametersType(
  {
    validations: PropTypes.array,
    type: PropTypes.func,
    baseArray: PropTypes.array
  },
  function concatValidationArray(validations = [], type, baseArray = []) {
    validations.forEach(element => {
      if (element instanceof type) {
        baseArray = baseArray.concat(element.validations);
      } else {
        baseArray.push(element);
      }
    });
    return baseArray;
  }
);

function getPatternArray(array) {
  const patternArray = [];
  array.forEach(element => {
    if (element.regex) {
      patternArray.push(element.regex);
    }
  });
  return patternArray;
}

function getPropertyFromArray(array, property) {
  const foundProperty = array.find(element => {
    return element[property];
  });
  return foundProperty ? foundProperty[property] : undefined;
}

export default class ValidationsManager {
  failedValidation = {};

  constructor(validations) {
    this.validations = concatValidationArray(validations, ValidationsManager);
    this.pattern = getPatternArray(this.validations);
    this.maxlength = getPropertyFromArray(this.validations, 'maxLength');
    this.minlength = getPropertyFromArray(this.validations, 'minLength');
    this.required = getPropertyFromArray(this.validations, 'required');
  }

  validateCharsPattern = value => {
    const faildCharsPatern = this.validations.find(element => {
      return element.charsPattern ? !element.charsPattern.test(value) : false;
    });
    return {
      message: faildCharsPatern ? faildCharsPatern.message().hebrew : '',
      isValid: faildCharsPatern ? false : true
    };
  };

  validate = (value, getDepended) => {
    //observable ??
    this.failedValidation = this.validations.find(item => {
      return !item.validator(value, getDepended);
    });

    return Object.assign(validationState, {
      message: this.failedValidation
        ? this.failedValidation.message(value, getDepended).hebrew
        : '',
      isValid: this.failedValidation ? false : true
    });
  };
  addValidations = validations => {
    concatValidationArray(validations, ValidationsManager, this.validations);
  };
}
