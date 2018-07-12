import { concatArray } from 'validations/utils';

const dataschemaAssign = validationArray =>
  validationArray.reduce(
    (dataSchema, val) =>
      val.dataSchema
        ? Object.assign({}, dataSchema, val.dataSchema)
        : dataSchema,
    {}
  );

export default class validationsManager {
  failedValidation = {};

  constructor(validations) {
    this.validations = concatArray(validations);
    this.dataSchema = dataschemaAssign(this.validations);
  }
  setValidations = validations => {
    //add dataSchema??
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
