// export default{
//     maxlength:() = value => {
//   return {
//     hebrew: `עליך להזין עד ${value} תווים`,
//     english: `Please enter no more than ${value} characters`,
//     arabic: `يجب إدخال ما يصل إلى ${value} حرفا`
//   };
// },
// minlength = value => {
//   return {
//     hebrew: `עליך להזין לפחות ${value} תווים`,
//     english: `Please enter at least ${value} characters`,
//     arabic: `أدخل ${value} حرفا على الأقل`
//   };
// }
// }
const maxlength = value => {
  return {
    hebrew: `עליך להזין עד ${value} תווים`,
    english: `Please enter no more than ${value} characters`,
    arabic: `يجب إدخال ما يصل إلى ${value} حرفا`
  };
};

const minlength = value => {
  return {
    hebrew: `עליך להזין לפחות ${value} תווים`,
    english: `Please enter at least ${value} characters`,
    arabic: `أدخل ${value} حرفا على الأقل`
  };
};

export default {
  maxlength,
  minlength
};
