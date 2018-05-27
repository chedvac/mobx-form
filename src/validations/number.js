import messages from '../resources/texts/messages'
import {stringExtensionFormat} from './utils'

export const greaterThan =(params)=> {
    let {number, message} = params;
    return {
        validator: (val)=>{
            if (!number ||isNaN(number.toString())) {
                return true;
            }
            number = parseFloat(number);
            val = parseFloat(val);
            if (isNaN(val)) {
                return true;
            }
            return val > number;
        },
        message: message || stringExtensionFormat(messages.number.greaterThan.hebrew,number)
    }
}

export const lessThan = params => {
    let {number, message} = params;
    return{
        validator: (val)=>{
            if (!number ||isNaN(number.toString())) {
                return true;
            }
            number = parseFloat(number);
            val = parseFloat(val);
            if (isNaN(val)) {
                return true;
            }
            return val < number;
        },
        message: message || stringExtensionFormat(messages.number.lessThan.hebrew,number)
    }
};