import {constructMessage} from './../validations/utils'

function generateBasicValidation(settings, params, validator){
    Object.assign(settings, params);
    //TODO handle schemaData
    const {name, message, condition} = settings;
    const validatorWrapper =(v) =>{ 
        return (condition && condition(v) && validator(v)) || 
        (!condition && validator(v))
    };
    
    return {validator: validatorWrapper, message};      
};

function generateRegexValidation(settings, params){
    const validator = v => {
        return v.toString().match(settings.regex) ? true : false;
    }
    return generateBasicValidation(settings, params, validator);
};

export default {
    generateBasicValidation,
    generateRegexValidation,
}