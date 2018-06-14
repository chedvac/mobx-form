import validationFactory from './validationsFactory';

export function  maxlength(params){
    const maxlengthValidation = value =>  value.length <= params.value;
    const settings = {name: 'maxlength', message: 'יש להזין עד ' + params.value + ' תווים'};
    return validationFactory.generateBasicValidation(settings, params, maxlengthValidation);
}

export function  minlength(params){
    const minlengthValidation = value => value.length >= params.value;
    const settings = {name: 'maxlength', message: 'יש להזין לפחות ' + params.value + ' תווים'};
    return validationFactory.generateBasicValidation(settings, params, minlengthValidation);
}
