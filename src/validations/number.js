import messages from '../resources/texts/messages'
import {stringExtensionFormat} from './utils'
import validationFactory from './validationsFactory';

export function greaterThan(params){
    let {number} = params;
    const validator = (val)=>{
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
    return validationFactory.generateBasicValidation({name: 'greaterThan', message: stringExtensionFormat(messages.number.greaterThan.hebrew,number)}, params, validator);
};

// export const lessThan = params => {
//     let {number, message} = params;
//     return{
//         validator: (val)=>{
//             if (!number ||isNaN(number.toString())) {
//                 return true;
//             }
//             number = parseFloat(number);
//             val = parseFloat(val);
//             if (isNaN(val)) {
//                 return true;
//             }
//             return val < number;
//         },
//         message: message || stringExtensionFormat(messages.number.lessThan.hebrew,number)
//     }
// };