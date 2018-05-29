function  maxlength({num = 5, message = '5יש להזין ערך קטן מ'} ){
    const maxlengthValidation = value => value.length <= num;
    return [generateBasicValidation({ validator: maxlengthValidation, message: message})]
}
function  minlength({num = 1, message = 'יש להזין ערך גדול מ1'}){
    const maxlengthValidation = value => value.length >= num;
    return generateBasicValidation({validator: maxlengthValidation, message: message})
}