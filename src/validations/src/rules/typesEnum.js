import regex from '../../resources/regularExpressions';
import messages from '../../resources/texts/messages';
export default {
  address: {
    //     url: {name: 'url', regex: regex.url, message: messages.address.hebrew.url},
    //     email: {name: 'email', regex: regex.email, message: messages.address.hebrew.email},
    houseNumber: {
      name: 'houseNumber',
      regex: regex.houseNumber,
      message: messages.address.hebrew.houseNumber
    }
  },
  // general: {
  // },
  language: {
    hebrewName: {
      name: 'hebrewName',
      regex: regex.hebrew,
      message: messages.language.hebrew.hebrew
    },
    noHebrewLetters: {
      name: 'noHebrewLetters',
      regex: regex.noHebrewLetters,
      message: messages.language.hebrew.noFinalLetters
    }
  },
  digits: {
    notZeroDigits: {
      name: 'notZeroDigits',
      regex: regex.notZeroDigits,
      message: messages.digits.hebrew.notZeroDigits
    },
    startWithZero: {
      name: 'startWithZero',
      regex: regex.startWithZero,
      message: messages.digits.hebrew.startWithZero
    },
    startWithDigit: {
      name: 'startWithDigit',
      regex: regex.startWithDigit,
      message: messages.digits.hebrew.startWithDigit
    }
  }
};
