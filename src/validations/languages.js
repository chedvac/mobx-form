import regex from '../resources/regularExpressions';
import languageMessages from '../resources/texts/language'
import Validation from './BasicValidation'
const requiredValidator = (value) => {
    return value.toString().trim().length > 0;
  };
  const validateHebrewName = (value, params) => {
    console.log('params',params)
    return value.toString().trim().match(regex.hebrew)     
  };
export const hebrewName = new Validation({
  name: "hebrewName", 
  validator: validateHebrewName, 
  message: languageMessages.hebrew.hebrew
})
export const required = new Validation({
  name: "required", 
  validator: requiredValidator, 
  message: 'חובה להזין ערך בשדה זה'
})
  export default {
    required,
    hebrewName
  }