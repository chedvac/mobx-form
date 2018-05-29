import validationFactory from './validationsFactory';
import typesEnum from './typesEnum';

export function notZeroDigits(params){
    return  validationFactory.generateRegexValidation(typesEnum.digits.notZeroDigits, params);
}

export function startWithDigit(params){
    return  validationFactory.generateRegexValidation(typesEnum.digits.startWithDigit, params);
}

export function startWithZero(params){
    return  validationFactory.generateRegexValidation(typesEnum.digits.startWithZero, params);
}
    