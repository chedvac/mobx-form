import { observable, action } from 'mobx';

export default class ValidationState {
  @observable message = '';
  @observable isValid = true;
  constructor() {
    this.setIsValid = this.setIsValid.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setValidationState = this.setValidationState.bind(this);
  }
  @action
  setMessage = function(message) {
    if (typeof message !== 'string') {
      throw 'should get string param ';
    }
    this.message = message;
  };
  @action
  setIsValid = function(isValid) {
    if (typeof isValid !== 'boolean') {
      throw 'should get boolean param ';
    }
    this.isValid = isValid;
  };
  @action
  setValidationState = function(validationState) {
    const { isValid, message } = validationState;
    if (isValid === undefined) {
      throw 'missing require parameter: isValid';
    }
    this.isValid = isValid;
    this.message = message;
  };
}
