import { generateRegexValidation } from 'vm-validations/validationsFactory';
import validationsManager from '../core/validationsManager';
import regex from '../regularExpressions/address';
import messages from '../messages/address';
import { minlength, maxlength, length } from './basic';
import { integer, notZeroDigits } from './number';

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

export function IPAddress(params) {
  const pattern = generateRegexValidation({
    name: 'IPAddressRegex',
    regex: regex.IPAddress,
    message: () => messages.IPAddress(),
    params
  });

  return new validationsManager([pattern, maxlength({ value: 19, params })]);
}

export function houseNumber(params) {
  const pattern = generateRegexValidation({
    name: 'IPAddressRegex',
    regex: regex.IPAddress,
    message: () => messages.IPAddress(),
    params
  });

  return new validationsManager([
    pattern
    // maxlength({ value: 50, params }) TODO: not exist maxlength in common3, is correct?
  ]);
}

export function apartment(params) {
  return new validationsManager([
    integer(params),
    maxlength({ value: 7, params })
  ]);
}

export function mailbox(params) {
  return new validationsManager([
    integer(params),
    maxlength({ value: 5, params }),
    minlength({ value: 2, params })
  ]);
}

export function zipCode(params) {
  return new validationsManager([
    notZeroDigits(params),
    integer(params),
    length({ value: 7, params })
  ]);
}

//TODO:
// IPAddress
// houseNumber
// street
// City
// apartment
