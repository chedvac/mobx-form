export default {
  number: () => ({
    hebrew: `עליך להזין ערך מספרי בלבד`,
    english: `يجب اضافه رقم فقط`,
    arabic: `Please enter a valid numeric value`
  }),
  greaterThan: value => {
    value = value.value || value;
    return {
      hebrew: `עליך להזין מספר גדול מ ${value}`,
      arabic: `أدخل رقما أكبر من ${value}`,
      english: `Please enter a value greater than ${value}`
    };
  },
  lessThan: value => {
    value = value.value || value;
    return {
      hebrew: `עליך להזין מספר קטן מ ${value}`,
      arabic: `أدخل رقما أقل من ${value}`,
      english: `Please enter a value less than ${value}`
    };
  }
};
