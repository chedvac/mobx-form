import validationFactory from './validationsFactory';
import typesEnum from './typesEnum';

    const notZeroDigits = validationFactory.generateRegexValidation(typesEnum.digits.notZeroDigits);
    const startWithDigit = validationFactory.generateRegexValidation(typesEnum.digits.startWithDigit);
    const startWithZero = validationFactory.generateRegexValidation(typesEnum.digits.startWithZero);
    
    const  houseNumberRegex =function(settings){
        // typesEnum.address.houseNumber = {...settings}
        return validationFactory.generateRegexValidation(Object.assign(typesEnum.address.houseNumber, settings));
    }

    function  houseNumber({message, condition}){
        return [notZeroDigits, houseNumberRegex({message, condition})]
    }
        
    
export default {
    notZeroDigits,
    startWithZero,
    startWithDigit, 
    houseNumberRegex,
    houseNumber
}