import { generateRegexValidation } from 'vm-validations/validationsFactory';
import messages from 'validations/messages/text';
import regex from '../regularExpressions/text';
import PropTypes from 'prop-types';
import validationsManager from 'vm-validations/ValidationsManager';
import { minlength } from './basic';
import assertParametersType from 'utils/typeVerifications';

const paramsPropTypes = {
  params: PropTypes.shape({
    message: PropTypes.func
  })
};

export const hebrew = assertParametersType(paramsPropTypes, function hebrew(
  params = {}
) {
  return generateRegexValidation({
    name: 'hebrew',
    message: () => messages.hebrew(),
    params,
    regex: regex.hebrew
  });
});

export const english = assertParametersType(paramsPropTypes, function english(
  params = {}
) {
  return generateRegexValidation({
    name: 'english',
    message: () => messages.english(),
    params,
    regex: regex.english
  });
});

export const hebrewNumber = assertParametersType(
  paramsPropTypes,
  function hebrewNumber(params = {}) {
    return generateRegexValidation({
      name: 'hebrewNumber',
      message: () => messages.hebrewNumber(),
      params,
      regex: regex.hebrewNumber
    });
  }
);

export const noHebrewLetters = assertParametersType(
  paramsPropTypes,
  function noHebrewLetters(params = {}) {
    return generateRegexValidation({
      name: 'noHebrewLetters',
      message: () => messages.noHebrewLetters(),
      params,
      regex: regex.noHebrewLetters
    });
  }
);

export const englishNumber = assertParametersType(
  paramsPropTypes,
  function englishNumber(params = {}) {
    return generateRegexValidation({
      name: 'englishNumber',
      message: () => messages.englishNumber(),
      params,
      regex: regex.englishNumber
    });
  }
);

export const englishExtended = assertParametersType(
  paramsPropTypes,
  function englishExtended(params = {}) {
    return generateRegexValidation({
      name: 'englishExtended',
      message: () => messages.englishExtended(),
      params,
      regex: regex.englishExtended
    });
  }
);

export const englishHebrew = assertParametersType(
  paramsPropTypes,
  function englishHebrew(params = {}) {
    return generateRegexValidation({
      name: 'englishHebrew',
      message: () => messages.englishHebrew(),
      params,
      regex: regex.englishHebrew
    });
  }
);

export const englishHebrewNumber = assertParametersType(
  paramsPropTypes,
  function englishHebrewNumber(params = {}) {
    return generateRegexValidation({
      name: 'englishHebrewNumber',
      message: () => messages.englishHebrewNumber(),
      params,
      regex: regex.englishHebrewNumber
    });
  }
);

export const fileName = assertParametersType(
  paramsPropTypes,
  function hebrewNumber(params = {}) {
    return generateRegexValidation({
      name: 'fileName',
      message: () => messages.fileName(),
      params,
      regex: regex.fileName
    });
  }
);

export const startWithDigit = assertParametersType(
  paramsPropTypes,
  function startWithDigit(params = {}) {
    return generateRegexValidation({
      name: 'startWithDigit',
      message: () => messages.startWithDigit(),
      params,
      regex: regex.startWithDigit
    });
  }
);

export const noApostrophe = assertParametersType(
  paramsPropTypes,
  function noApostrophe(params = {}) {
    return generateRegexValidation({
      name: 'noApostrophe',
      message: () => messages.noApostrophe(),
      params,
      regex: regex.noApostrophe
    });
  }
);

export const apostropheAfterLetters = assertParametersType(
  paramsPropTypes,
  function apostropheAfterLetters(params = {}) {
    return generateRegexValidation({
      name: 'apostropheAfterLetters',
      message: () => messages.apostropheAfterLetters(),
      params,
      regex: regex.apostropheAfterLetters
    });
  }
);

export const noFinalLetters = assertParametersType(
  paramsPropTypes,
  function noFinalLetters(params = {}) {
    return generateRegexValidation({
      name: 'noFinalLetters',
      message: () => messages.noFinalLetters(),
      params,
      regex: regex.noFinalLetters
    });
  }
);

export const finalLetters = assertParametersType(
  paramsPropTypes,
  function finalLetters(params = {}) {
    return generateRegexValidation({
      name: 'finalLetters',
      message: () => messages.finalLetters(),
      params,
      regex: regex.finalLetters
    });
  }
);

export const freeText = assertParametersType(paramsPropTypes, function freeText(
  params = {}
) {
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
});

export const freeHebrew = assertParametersType(
  paramsPropTypes,
  function freeHebrew(params = {}) {
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
);
