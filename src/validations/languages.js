import validationFactory from './validationsFactory';
import typesEnum from './typesEnum';
const hebrewName = validationFactory.generateRegexValidation(typesEnum.language.hebrewName);
const noHebrewLetters = validationFactory.generateRegexValidation(typesEnum.language.noHebrewLetters);

  export default {
    hebrewName,
    noHebrewLetters
  }