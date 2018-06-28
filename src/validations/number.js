import { stringExtensionFormat } from "./utils";
import validationFactory from "./validationsFactory";
import regex from "./resources/regularExpressions";
import messages from "./resources/texts/number";

export function greaterThan(params) {
  let { number1 } = params;
  function validator(val, obs, parent) {
    let number;
    if (typeof number1 === "object") {
      number = number1.get();
    } else {
      number = number1 === "function" ? number1() : number1;
    }

    if (!number || isNaN(number.toString())) {
      return true;
    }
    number = parseFloat(number);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val > number;
  }
  // return validationFactory.generateBasicValidation({name: 'greaterThan', message: stringExtensionFormat(messages.number.greaterThan.hebrew,number1)}, params, validator);
  const settings = {
    name: "greaterThan",
    message: () => stringExtensionFormat(messages.greaterThan.hebrew, "גיל הבן")
  };
  return validationFactory.generateBasicValidation(settings, validator, params);
}

export function lessThan(params) {
  let { number1 } = params;
  function validator(val, obs, parent) {
    let number;
    if (typeof number1 === "object") {
      number = number1.get();
    } else {
      number = number1 === "function" ? number1() : number1;
    }

    if (!number || isNaN(number.toString())) {
      return true;
    }
    number = parseFloat(number);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val < number;
  }
  return validationFactory.generateBasicValidation(
    {
      name: "greaterThan",
      message: () => stringExtensionFormat(messages.lessThan.hebrew, "גיל האב")
    },
    validator,
    params
  );
}

export function number(params) {
  return validationFactory.generateRegexValidation({
    name: "number",
    regex: regex.number,
    message: () => messages.number
  }); //TODO: number regex
}

export function integer(params) {
  const pattern = validationFactory.generateRegexValidation({}, params);
  return [pattern, number(params)];
}
