import {
  generateBasicValidation
  // generateConditionValidation
} from 'validations/core/validationsFactory';

export function required(params) {
  const validation = value => value.length > 0;
  const settings = { name: 'required', message: 'חובה להזין ערך בשדה' };
  return generateBasicValidation(settings, params, validation);
}
// export function conditionRequired(settings) {
//   const validator = value => value.length > 0;
//   const defaultSettings = {
//     name: 'required',
//     message: 'חובה להזין ערך בשדה',
//     validator
//   };
//   Object.assign(settings, defaultSettings);
//   return generateConditionValidation(settings);
// }
export function maxlength(params) {
  const maxlengthValidation = value => value.length <= params.value;
  const settings = {
    name: 'maxlength',
    message: 'יש להזין עד ' + params.value + ' תווים'
  };
  return generateBasicValidation(settings, params, maxlengthValidation);
}

export function minlength(params) {
  const minlengthValidation = value => value.length >= params.value;
  const settings = {
    name: 'maxlength',
    message: 'יש להזין לפחות ' + params.value + ' תווים'
  };
  return generateBasicValidation(settings, params, minlengthValidation);
}
