// export default {
//   lessThan = value => {
//       return{
//     hebrew: `עליך להזין מספר קטן מ ${value}`,
//     arabic: `أدخل رقما أقل من ${value}`,
//     english: `Please enter a value less than ${value}`}
//   },
//   greaterThan = value => {
//       return{
//     hebrew: `עליך להזין מספר גדול מ ${value}`,
//     arabic: `أدخل رقما أكبر من ${value}`,
//     english: `Please enter a value greater than ${value}`}
//   }
// };

const lessThan = value => {
  value = value.number || value;
  return {
    hebrew: `עליך להזין מספר קטן מ ${value}`,
    arabic: `أدخل رقما أقل من ${value}`,
    english: `Please enter a value less than ${value}`
  };
};

const greaterThan = value => {
  value = value.number || value;
  return {
    hebrew: `עליך להזין מספר גדול מ ${value}`,
    arabic: `أدخل رقما أكبر من ${value}`,
    english: `Please enter a value greater than ${value}`
  };
};

export default {
  lessThan,
  greaterThan
};
