import messages from '../resources/texts/messages'
import { stringExtensionFormat } from './utils'
import validationFactory from './validationsFactory';

function greaterThanValidator(params) {
    let { number } = params;
    return (val) => {
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
}

function lessThanValidator(params) {
    let { number } = params;
    return (val) => {
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
}

export function greaterThan(params) {
    let { number } = params;
    const settings = { name: 'greaterThan', message: stringExtensionFormat(messages.number.greaterThan.hebrew, "גיל הבן") }
    return validationFactory.generateBasicValidation(settings, params, greaterThanValidator(params));
};

export function lessThan(params) {
    let { number } = params;
    return validationFactory.generateBasicValidation({ name: 'greaterThan', message: stringExtensionFormat(messages.number.lessThan.hebrew, "גיל האב") }, params, lessThanValidator(params));
};

export function dependedGreaterThan(params) {
    return validationFactory.generateDependedValidation({ name: 'dependedGreaterThan', message: messages.number.greaterThan.hebrew }, params, greaterThanValidator);
}

export function dependedLessThan(params) {
    return validationFactory.generateDependedValidation({ name: 'dependedLessThan', message: messages.number.lessThan.hebrew }, params, lessThanValidator);
}