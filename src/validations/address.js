import validationFactory from './validationsFactory';
import typesEnum from './typesEnum';
import { notZeroDigits } from './digits';

    function  houseNumber(params){
        const houseNumberRegex = validationFactory.generateRegexValidation(typesEnum.address.houseNumber,params);
         //const notZeroDigits = notZeroDigits(settings)
        return [notZeroDigits(params), houseNumberRegex]
    }
        
    
export default {
    houseNumber
}