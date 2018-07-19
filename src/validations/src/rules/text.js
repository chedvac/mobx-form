import { generateRegexValidation } from 'validations/core/validationsFactory';
import messages from 'validations/messages/text';
import regex from '../regularExpressions/text';
import PropTypes from 'prop-types';
import assertParametersType from 'core/typeVerifications';
import { minlength } from './basic';
import validationsManager from '../core/validationsManager';

const paramsPropTypes = {
  params: PropTypes.shape({
    message: PropTypes.func
  })
};

export function hebrew(params = {}) {
  return generateRegexValidation({
    name: 'hebrew',
    message: () => messages.hebrew(),
    params,
    regex: regex.hebrew
  });
}
export function english(params = {}) {
  return generateRegexValidation({
    name: 'english',
    message: () => messages.english(),
    params,
    regex: regex.english
  });
}
export function hebrewNumber(params = {}) {
  return generateRegexValidation({
    name: 'hebrewNumber',
    message: () => messages.hebrewNumber(),
    params,
    regex: regex.hebrewNumber
  });
}
export function noHebrewLetters(params = {}) {
  return generateRegexValidation({
    name: 'noHebrewLetters',
    message: () => messages.noHebrewLetters(),
    params,
    regex: regex.noHebrewLetters
  });
}
export function englishNumber(params = {}) {
  return generateRegexValidation({
    name: 'englishNumber',
    message: () => messages.englishNumber(),
    params,
    regex: regex.englishNumber
  });
}
export function englishExtended(params = {}) {
  return generateRegexValidation({
    name: 'englishExtended',
    message: () => messages.englishExtended(),
    params,
    regex: regex.englishExtended
  });
}
export function englishHebrew(params = {}) {
  return generateRegexValidation({
    name: 'englishHebrew',
    message: () => messages.englishHebrew(),
    params,
    regex: regex.englishHebrew
  });
}
export function englishHebrewNumber(params = {}) {
  return generateRegexValidation({
    name: 'englishHebrewNumber',
    message: () => messages.englishHebrewNumber(),
    params,
    regex: regex.englishHebrewNumber
  });
}
export function fileName(params = {}) {
  return generateRegexValidation({
    name: 'fileName',
    message: () => messages.fileName(),
    params,
    regex: regex.fileName
  });
}
export function startWithDigit(params = {}) {
  return generateRegexValidation({
    name: 'startWithDigit',
    message: () => messages.startWithDigit(),
    params,
    regex: regex.startWithDigit
  });
}
export function noApostrophe(params = {}) {
  return generateRegexValidation({
    name: 'noApostrophe',
    message: () => messages.noApostrophe(),
    params,
    regex: regex.noApostrophe
  });
}
export function freeText(params) {
  assertParametersType({ params }, paramsPropTypes, 'freeTextRegex');
  const pattern = generateRegexValidation({
    name: 'freeTextRegex',
    regex: regex.freeText,
    message: () => messages.freeText(),
    params
  });

  return new validationsManager([
    pattern,
    minlength({ value: 2, params }),
    finalLetters(params)
  ]);
}

export function freeHebrew(params) {
  assertParametersType({ params }, paramsPropTypes, 'freeHebrewRegex');
  const pattern = generateRegexValidation({
    name: 'freeHebrewRegex',
    regex: regex.freeHebrew,
    message: () => messages.freeHebrew(),
    params
  });

  return new validationsManager([
    pattern,
    apostropheAfterLetters(params),
    finalLetters(params)
  ]);
}

export function apostropheAfterLetters(params = {}) {
  return generateRegexValidation({
    name: 'apostropheAfterLetters',
    message: () => messages.apostropheAfterLetters(),
    params,
    regex: regex.apostropheAfterLetters
  });
}
export function noFinalLetters(params = {}) {
  return generateRegexValidation({
    name: 'noFinalLetters',
    message: () => messages.noFinalLetters(),
    params,
    regex: regex.noFinalLetters
  });
}
export function finalLetters(params = {}) {
  return generateRegexValidation({
    name: 'finalLetters',
    message: () => messages.finalLetters(),
    params,
    regex: regex.finalLetters
  });
}
/**
 * apostropheAfterLetters
 * noFinalLetters
 * finalLetters
 *
 */
