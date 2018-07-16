import { observable, action } from 'mobx';
import assertParametersType from 'core/typeVerifications';
import PropTypes from 'prop-types';
export default class ValidationState {
  @observable message = '';
  @observable isValid = true;
  constructor() {
    this.setIsValid = this.setIsValid.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setValidationState = this.setValidationState.bind(this);
  }
  @action
  setMessage(message) {
    assertParametersType({ message }, { message: PropTypes.string }, 'message');
    this.message = message;
  }
  @action
  setIsValid(isValid) {
    assertParametersType({ isValid }, { isValid: PropTypes.string }, 'isValid');
    this.isValid = isValid;
  }
  @action
  setValidationState(validationState) {
    const { isValid, message } = validationState;
    assertParametersType({ isValid }, { isValid: PropTypes.string }, 'isValid');
    this.isValid = isValid;
    this.message = message;
  }
}
