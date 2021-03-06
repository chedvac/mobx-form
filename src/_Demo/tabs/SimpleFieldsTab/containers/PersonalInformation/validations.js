import { generateBasicValidation } from 'vm-validations/validationsFactory';

export function sumAges(params) {
  let { number } = params;
  const validator = val => {
    if (!number || isNaN(number.toString())) {
      return false;
    }
    number = parseFloat(number);
    const age = parseFloat(val.age);
    const fatherAge = parseFloat(val.fatherAge);
    if (isNaN(age) || isNaN(fatherAge)) {
      return false;
    }
    return age + fatherAge === number;
  };

  return generateBasicValidation({
    name: 'sumAges',
    message: () => ({
      hebrew: `סכום הגילאים חייב להיות ${number}`
    }),
    params,
    validator
  });
}
