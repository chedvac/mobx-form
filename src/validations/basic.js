import validationFactory from './validationsFactory';

export function maxlength(params){
    const maxlengthValidation = value =>  value.length <= params.value;
    const message = () => 'יש להזין עד ' + params.value + ' תווים';
    const settings = {name: 'maxlength', message};
    return validationFactory.generateBasicValidation(settings, maxlengthValidation, params);
}

export function minlength(params){
    const minlengthValidation = value => value.length >= params.value;
    const message = () => 'יש להזין לפחות ' + params.value + ' תווים';
    const settings = {name: 'maxlength', message};
    return validationFactory.generateBasicValidation(settings, minlengthValidation, params);
}

export function length(params){
    const message = (v) => `יש להזין ${params.value} תווים`;
    const settings = {name: 'length', message};
    return validationFactory.generateComplexValidation(settings, [maxlength({value: params.value, message}), minlength({value: params.value, message})], params);
    // return [maxlength({value: params.value, message: 'aaa'}), minlength({value: params.value, message: 'aaa'})];
}
