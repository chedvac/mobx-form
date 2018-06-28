import validationFactory from "./validationsFactory";
import regex from "./resources/regularExpressions";
import messages from "./resources/texts/text";

export function notZeroDigits(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "notZeroDigits",
      regex: regex.notZeroDigits,
      message: () => () => messages.notZeroDigits
    },
    params
  );
}

export function hebrewName(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "notZeroDigits",
      regex: regex.notZeroDigits,
      message: () => messages.notZeroDigits
    },
    params
  );
}

export function startWithZero(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "notZeroDigits",
      regex: regex.notZeroDigits,
      message: () => messages.notZeroDigits
    },
    params
  );
}

export function hebrewExtended(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "hebrewExtended",
      regex: regex.hebrewExtended,
      message: () => messages.hebrewExtended
    },
    params
  );
}

export function freeHebrew(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "freeHebrew",
      regex: regex.freeHebrew,
      message: () => messages.freeHebrew
    },
    params
  );
}

export function noHebrewLetters(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "noHebrewLetters",
      regex: regex.noHebrewLetters,
      message: () => messages.noHebrewLetters
    },
    params
  );
}

export function englishNumber(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "englishNumber",
      regex: regex.englishNumber,
      message: () => messages.englishNumber
    },
    params
  );
}

export function englishExtended(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "englishExtended",
      regex: regex.englishExtended,
      message: () => messages.englishExtended
    },
    params
  );
}

export function englishHebrew(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "englishHebrew",
      regex: regex.englishHebrew,
      message: () => messages.englishHebrew
    },
    params
  );
}

export function englishHebrewNumber(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "englishHebrewNumber",
      regex: regex.englishHebrew,
      message: () => messages.englishHebrewNumber
    },
    params
  );
}

export function apostropheAfterLetters(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "apostropheAfterLetters",
      regex: regex.apostropheAfterLetters,
      message: () => messages.apostropheAfterLetters
    },
    params
  );
}

export function noApostrophe(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "noApostrophe",
      regex: regex.noApostrophe,
      message: () => messages.noApostrophe
    },
    params
  );
}

export function noFinalLetters(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "noFinalLetters",
      regex: regex.noFinalLetters,
      message: () => messages.noFinalLetters
    },
    params
  );
}

export function finalLetters(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "finalLetters",
      regex: regex.finalLetters,
      message: () => messages.finalLetters
    },
    params
  );
}

export function startWithDigit(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "startWithDigit",
      regex: regex.startWithDigit,
      message: () => messages.startWithDigit
    },
    params
  );
}

export function fileName(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "fileName",
      regex: regex.fileName,
      message: () => messages.fileName
    },
    params
  );
}

export function freeText(params) {
  return validationFactory.generateRegexValidation(
    {
      name: "freeText",
      regex: regex.freeText,
      message: () => messages.freeText
    },
    params
  );
}
