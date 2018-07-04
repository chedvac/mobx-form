import { generateRegexValidation } from 'validations/core/validationsFactory';
import typesEnum from 'validations/typesEnum';

export function noHebrewLetters(params) {
  return generateRegexValidation(typesEnum.language.noHebrewLetters, params);
}

export function hebrewName(params) {
  return generateRegexValidation(typesEnum.language.hebrewName, params);
}
