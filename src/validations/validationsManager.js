import { concatArray } from './utils';

export default class validationsManager {
  failedValidation = {};

  constructor(validations) {
    this.validations = concatArray(validations);
  }
  // setDependencies = (dependencies)=>{
  //     dependencies.
  // }
  setValidations = validations => {
    this.validations = concatArray(validations, this.validations);
  };
  getMessage = () => {
    return this.failedValidation ? this.failedValidation.message : '';
  };
  validate = (value, observable) => {
    this.failedValidation = this.validations.find(item => {
      // setDependencies(item.dependencies)
      return !item.validator(value, observable);
    });
    return {
      message: this.failedValidation ? this.getMessage() : '',
      isValid: this.failedValidation ? false : true
    };
  };
}
