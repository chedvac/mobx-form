import { concatArray } from 'validations/utils';

export default class validationsManager {
  failedValidation = {};

  constructor(validations) {
    this.validations = concatArray(validations);
  }
  addValidations = validations => {
    this.validations = concatArray(validations, this.validations);
  };
  setValidations = validations => {
    this.validations = concatArray(validations, this.validations);
  };
  // getMessage = () => {
  //   return this.failedValidation ? this.failedValidation.message : '';
  // };
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
