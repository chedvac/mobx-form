import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import validationState, {
  validationStateMultiMessages
} from 'vm-validations/validationState';

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
  const foundProperty = array.find(element => element[property]);
  return foundProperty ? foundProperty[property] : undefined;
}

export default class ValidationsManager {
  constructor(validations, type) {
    this.validations = concatValidationArray(validations, ValidationsManager);
    this.type = type;

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

  booleanValue = {
    true: true,
    yes: true,
    '1': true,
    false: false,
    no: false,
    '0': false,
    null: false
  };

  enumfunction = {
    boolean: value =>
      this.booleanValue[value.toLowerCase().trim()] || Boolean(value),
    date: value => Date.parse(value),
    number: value => Number(value)
  };

  parsingByType = (value, parseType) => {
    return parseType
      ? this.enumfunction[parseType.name.toLowerCase()](value)
      : value;
  };

  validateType = (value, parseType) => {
    const messages = {
      Number: {
        hebrew: 'TYPE: עליך להזין ערך מספרי בלבד'
      },
      Date: {
        hebrew: 'TYPE: עליך להזין תאריך בפורמט תקין'
      }
    };
    const newValue = this.parsingByType(value, parseType);

    // how to check false of boolean type??
    Object.assign(validationState, {
      message: newValue ? '' : messages[parseType.name].hebrew,
      isValid: newValue ? true : false
    });
    return { validationState, value: newValue };
  };

  findFailedValidation = async value => {
    let failedValidation;
    for (const item of this.validations) {
      if (!(await item.validator(value))) {
        failedValidation = item;
        break;
      }
    }
    return failedValidation;
  };

  validate = async value => {
    const failedValidation = await this.findFailedValidation(value);

    return Object.assign(validationState, {
      message: failedValidation ? failedValidation.message(value).hebrew : '',
      isValid: failedValidation ? false : true
    });
  };
  validateMultiResults = async value => {
    const messages = [];
    let isValid = true;
    for (const item of this.validations) {
      if (!(await item.validator(value))) {
        messages.push(item.message(value).hebrew);
        isValid = false;
      }
    }
    return Object.assign(validationStateMultiMessages, { isValid, messages });
  };

  addValidations = validations => {
    concatValidationArray(validations, ValidationsManager, this.validations);
  };
}
