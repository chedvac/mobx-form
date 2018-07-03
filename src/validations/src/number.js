import messages from '../../resources/texts/messages';
import { stringExtensionFormat } from 'validations/utils';
import {
  generateBasicValidation,
  generateDependedValidation
} from 'validations/core/validationsFactory';

function greaterThanValidator(params) {
  let { number } = params;
  return val => {
    if (!number || isNaN(number.toString())) {
      return true;
    }
    number = parseFloat(number);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val > number;
  };
}

function lessThanValidator(params) {
  let { number } = params;
  return val => {
    if (!number || isNaN(number.toString())) {
      return true;
    }
    number = parseFloat(number);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val < number;
  };
}

export function greaterThan(params) {
  let { number } = params;
  const settings = {
    name: 'greaterThan',
    message: stringExtensionFormat(
      messages.number.greaterThan.hebrew,
      'גיל הבן'
    )
  };
  return generateBasicValidation(
    settings,
    params,
    greaterThanValidator(params)
  );
}

export function lessThan(params) {
  let { number } = params;
  return generateBasicValidation(
    {
      name: 'greaterThan',
      message: stringExtensionFormat(messages.number.lessThan.hebrew, 'גיל האב')
    },
    params,
    lessThanValidator(params)
  );
}

export function dependedGreaterThan(params) {
  return generateDependedValidation({
    name: 'dependedGreaterThan',
    message: messages.number.greaterThan.hebrew,
    params,
    validator: greaterThanValidator
  });
}

export function dependedLessThan(params) {
  return generateDependedValidation({
    name: 'dependedLessThan',
    message: messages.number.lessThan.hebrew,
    params,
    validator: lessThanValidator
  });
}
