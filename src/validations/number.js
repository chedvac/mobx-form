import messages from '../resources/texts/messages'
import {stringExtensionFormat} from './utils'
import validationFactory from './validationsFactory';

export function greaterThan(params){
    let {number1} = params;
    function validator(val) {
        let number;
        if(typeof number1 === "object"){
            number = number1.get();
        }
        else{
            number = number1 ==="function" ? number1() : number1;
        }        
                
        if (!number ||isNaN(number.toString())) {
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
    const settings = {name: 'greaterThan', message: stringExtensionFormat(messages.number.greaterThan.hebrew,"גיל הבן"), validator}
    return validationFactory.generateBasicValidation(settings, params, validator);
};

export function lessThan(params){
    let {number1} = params;
    function validator(val) {
        let number;
        if(typeof number1 === "object"){
            number = number1.get();
        }
        else{
            number = number1 ==="function" ? number1() : number1;
        }        
                
        if (!number ||isNaN(number.toString())) {
            return true;
        }
        number = parseFloat(number);
        val = parseFloat(val);
        if (isNaN(val)) {
            return true;
        }
        return val < number;
    }
    return validationFactory.generateBasicValidation({name: 'greaterThan', message: stringExtensionFormat(messages.number.lessThan.hebrew,"גיל האב")}, params, validator);
};