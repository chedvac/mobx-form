import { generateRegexValidation } from 'validations/core/validationsFactory';
import validationsManager from '../core/validationsManager';
import regex from '../regularExpressions/address';
import messages from '../messages/address';
import { minlength, maxlength } from './basic';

export function email(params) {
  const pattern = generateRegexValidation({
    name: 'emailRegex',
    regex: regex.email,
    message: () => messages.email(),
    params
  });

  return new validationsManager([pattern, maxlength({ value: 50, params })]);
}

export function url(params) {
  const pattern = generateRegexValidation({
    name: 'urlRegex',
    regex: regex.url,
    message: () => messages.url(),
    params
  });

  return new validationsManager([
    pattern
    // maxlength({ value: 50, params }) TODO: not exist maxlength in common3, is correct?
  ]);
}

//TODO:
// IPAddress
// houseNumber
// street
// City
// zipCode
// apartment
// mailbox
