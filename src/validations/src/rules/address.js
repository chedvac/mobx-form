import validationFactory from './core/validationsFactory';
import typesEnum from './typesEnum';
import { notZeroDigits } from './digits';

function houseNumber(params) {
  const houseNumberRegex = validationFactory.generateRegexValidation(
    typesEnum.address.houseNumber,
    params
  );
  return [notZeroDigits(params), houseNumberRegex];
}

export default {
  houseNumber
};
