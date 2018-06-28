import validationFactory from "./validationsFactory";
import { notZeroDigits, startWithZero } from "./text";
import regex from "./resources/regularExpressions";
import { minlength, maxlength } from "./basic";
import messages from "./resources/texts/address";

export function url(params) {
  const message = () => messages.url;
  const pattern = validationFactory.generateRegexValidation(
    { name: "urlRegex", regex: regex.url, message },
    params
  );
  const settings = { name: "url", message };
  return validationFactory.generateComplexValidation(
    settings,
    [minlength({ value: 4 }), pattern],
    params
  );
}

// export function email(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "emailRegex", regex: regex.email, message: messages.email },
//     params
//   );
//   return [minlength(6, {}), maxlength(50), pattern];
// }

// export function IPAdress(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     {
//       name: "IPAdress",
//       regex: regex.IPAddresses,
//       message: messages.IPAddresses
//     },
//     params
//   );
//   return [minlength(7), maxlength(19), pattern];
// }

// export function houseNumber(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "url", regex: regex.url, message: messages.url },
//     params
//   );
//   return [minlength(params), pattern];
// }

// export function street(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "street", regex: regex.street, message: messages.street },
//     params
//   );
//   return [minlength(params), pattern];
// }

// export function city(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "city", regex: regex.city, message: messages.city },
//     params
//   );
//   return [minlength(params), pattern];
// }

// export function zipCode(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "zipCode", regex: regex.zipCode, message: messages.zipCode },
//     params
//   );
//   return [minlength(params), pattern];
// }

// export function apartment(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "apartment", regex: regex.apartment, message: messages.apartment },
//     params
//   );
//   return [minlength(params), pattern];
// }

// export function mailbox(params) {
//   const pattern = validationFactory.generateRegexValidation(
//     { name: "mailbox", regex: regex.mailbox, message: messages.mailbox },
//     params
//   );
//   return [minlength(params), pattern];
// }
