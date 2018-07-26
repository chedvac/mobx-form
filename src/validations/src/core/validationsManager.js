function concatValidationArray(array = [], type) {
  let newArray = [];
  array.forEach(element => {
    if (element instanceof type) {
      newArray = newArray.concat(element.validations);
    } else {
      newArray.push(element);
    }
  });
  return newArray;
}
function getPatternArray(array) {
  let patternArray = [];
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
export default class validationsManager {
  failedValidation = {};

  constructor(validations) {
    this.validations = concatValidationArray(validations, validationsManager);
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

  validate = (value, observable) => {
    this.failedValidation = this.validations.find(item => {
      return !item.validator(value, observable);
    });
    return {
      message: this.failedValidation
        ? this.failedValidation.message(value, observable).hebrew
        : '',
      isValid: this.failedValidation ? false : true
    };
  };
}
