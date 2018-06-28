import validationFactory from './validationsFactory';

export function noHebrewLetters(params){
  return validationFactory.generateRegexValidation(typesEnum.language.noHebrewLetters, params);
}

export function hebrewName(params){
  return validationFactory.generateRegexValidation(typesEnum.language.hebrewName, params);
}
