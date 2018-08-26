import { observable, action } from 'mobx';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default class ValidationState {
  //todo: change to object observable
  @observable message = '';
  @observable isValid = true;

  @action.bound
  setMessage(message) {
    //todo: fix assertParametersType
    assertParametersType({ message }, { message: PropTypes.bool }, 'message');
    this.message = message;
  }
  @action.bound
  setIsValid(isValid) {
    assertParametersType({ isValid }, { isValid: PropTypes.bool }, 'isValid');
    this.isValid = isValid;
  }
  @action.bound
  setValidationState(validationState) {
    const { isValid, message } = validationState;
    assertParametersType({ isValid }, { isValid: PropTypes.bool }, 'isValid');
    this.isValid = isValid;
    this.message = message;
  }
}
