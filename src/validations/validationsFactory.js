import {constructMessage} from './../validations/utils'

function generateBasicValidation({validator1, message, condition, schemaProperties}){
    const validator =(v) =>{ 
        return (condition && condition(v) && validator1(v)) || 
        (!condition && validator1(v))
    };
    
    return {validator, message, condition, schemaProperties};      
};
function generateRegexValidation({regex, message, condition, minLength, maxLength}){

    const validator1 = v => {
        return v.toString().match(regex) ? true : false;
    }
    return generateBasicValidation({validator1, message});
};
export function generateGreaterThan({message ,value, condition}){
    const validator = v => v > value;
    return generateBasicValidation({validator, message, condition});
};

function  maxlength({num = 5, message = '5יש להזין ערך קטן מ'} ){
    const maxlengthValidation = value => value.length <= num;
    return [generateBasicValidation({ validator: maxlengthValidation, message: message})]
}
function  minlength({num = 1, message = 'יש להזין ערך גדול מ1'}){
    const maxlengthValidation = value => value.length >= num;
    return generateBasicValidation({validator: maxlengthValidation, message: message})
}




export default {
    generateBasicValidation,
    generateRegexValidation,
}