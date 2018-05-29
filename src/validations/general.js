import validationFactory from './validationsFactory';

export function  maxlength(params){
    const maxlengthValidation = value => {
        return value.length <= params.value;
    }
    const settings = {message: 'יש להזין עד '+params.value+' תווים'}
    return validationFactory.generateBasicValidation(settings, params, maxlengthValidation)
}
export function  minlength({num = 1, message = 'יש להזין ערך גדול מ1'}){
    const maxlengthValidation = value => value.length >= num;
    return validationFactory.generateBasicValidation({validator: maxlengthValidation, message: message})
}
