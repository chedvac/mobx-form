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

export default class validationsManager {
  failedValidation = {};

  constructor(validations) {
    this.validations = concatValidationArray(validations, validationsManager);
  }
  setValidations = validations => {
    this.validations = concatValidationArray(validations, this.validations);
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
