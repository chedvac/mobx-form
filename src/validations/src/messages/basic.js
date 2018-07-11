const required = value => {
  return {
    hebrew: `חובה להזין ערך בשדה זה`,
    english: `{0} is required`,
    arabic: `يجب اضافه قيمه بهذا المكان`
  };
};

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

const length = value => {
  return {
    hebrew: `עליך להזין ${value} תווים`,
    english: `Please enter ${value} characters`,
    arabic: `إنتر ${value} تشاراكترز`
  };
};
export default {
  required,
  maxlength,
  minlength,
  length
};
