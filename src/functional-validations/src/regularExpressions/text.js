export default {
  hebrew: /^([א-ת-'"\s()]*)\s*$/,
  hebrewNumber: /^[\s\dא-ת‎]*$/,
  hebrewExtended: /^[\sא-ת0-9!@#?\$%\^\&*\)\(:;+=._-]+$/,
  freeHebrew: /^[א-ת0-9\-'"\s\(\)\.,:]*$/,
  noHebrewLetters: /^[^א-ת]+$/,
  english: /^[\-\'\"\sa-zA-Z\(\)]*$/,
  englishNumber: /^[\s\dA-Za-z\/]*$/,
  englishExtended: /^[\sa-zA-Z0-9!@#?\$%\^\&*\)\(:;+=._-]+$/,
  englishHebrew: /^[\-\'\"\sa-zA-Zא-ת\(\)]*$/,
  englishHebrewNumber: /^[ a-zA-Zא-ת0-9]*$/,
  apostropheAfterLetters: /^([^']*(?=[זגחצץעתד]).')*[^']*$/,
  noApostrophe: /^(?!.*').*$/,
  onlyFinalLetters: /^[^םןךףץ]*$/,
  finalLetters: /^([^םןךףץ]*[םןךףץ][^א-ת])*[^םןךףץ]*[םןךףץ]?$/,
  startWithDigit: /^[0-9].*$/,
  fileName: /^[^\/\\:*?"<>\|]*$/,
  freeText: /^(?![\x00-\x7Fא-ת]*[&<>])[\x00-\x7Fא-ת]*$/
};
