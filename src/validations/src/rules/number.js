import messages from 'validations/messages/number';
import { stringExtensionFormat } from 'validations/utils';
import {
  generateBasicValidation,
  generateDependedValidation
} from 'validations/core/validationsFactory';
import {
  greaterThanChecker,
  lessThanChecker
} from 'validations/checkers/number';

export function greaterThan(params) {
  let { number } = params;
  const settings = {
    name: 'greaterThan',
    message: stringExtensionFormat(messages.greaterThan, 'גיל הבן')
  };
  return generateBasicValidation(settings, params, greaterThanChecker(params));
}

export function lessThan(params) {
  let { number } = params;
  return generateBasicValidation(
    {
      name: 'greaterThan',
      message: stringExtensionFormat(messages.lessThan, 'גיל האב')
    },
    params,
    lessThanChecker(params)
  );
}

export function dependedGreaterThan(params) {
  return generateDependedValidation({
    name: 'dependedGreaterThan',
    message: messages.greaterThan,
    params,
    validator: greaterThanChecker
  });
}

export function dependedLessThan(params) {
  return generateDependedValidation({
    name: 'dependedLessThan',
    message: messages.lessThan,
    params,
    validator: lessThanChecker
  });
}
