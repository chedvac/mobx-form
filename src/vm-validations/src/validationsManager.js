import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import validationState,{validationStateMultyMessages} from 'vmValidations/validationState';

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
  // failedValidation = {};

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

   validate = async(value, observable) => {
    let failedValidation;
    for (const item of this.validations) {
        if(!await item.validator(value, observable)){
          failedValidation=item; 
          break;
        }
    }
    return Object.assign(validationState, {
      message: failedValidation
        ? failedValidation.message(value, observable).hebrew
        : '',
      isValid: failedValidation ? false : true
    });
  };
   validateAll = async type => {
    const messages = [];
    const isValid = this.validations.every(async item => {
      let result;
      try{
      result = await item.validator(type);
      }catch(e){
        result = e//?
      }
      result.message ? messages.push(result.message) : null;
      
      return result.isValid;
    });
    return Object.assign(validationStateMultyMessages, {isValid,messages});
  };
  // validateAll = type => {
  //   const messages = [];
  //   const isValid = this.validations.every(item => {
  //     const result = item.validator(type);
  //     result.message ? messages.push(result.message) : null;
  //     return result.isValid;
  //   });
  //   return Object.assign(validationStateMultyMessages, {isValid,messages});
  // };

  addValidations = validations => {
    concatValidationArray(validations, ValidationsManager, this.validations);
  };
}
