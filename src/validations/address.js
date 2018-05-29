import validationFactory from './validationsFactory';
import typesEnum from './typesEnum';
import { notZeroDigits } from './digits';

    function  houseNumber(settings){
        const houseNumberRegex = validationFactory.generateRegexValidation(typesEnum.address.houseNumber,settings);
        // const notZeroDigits = notZeroDigits(settings)
        return [houseNumberRegex]
    }
        
    
export default {
    houseNumber
}