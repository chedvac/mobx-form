const hebrew = () => {
  return {
    hebrew: 'עליך להזין אותיות בעברית',
    arabic: 'عليك كتابة الاحرف بالعبريه فقط ',
    english: 'Please use only use Hebrew  characters.'
  };
};

const hebrewNumber = () => {
  return {
    hebrew: ' עליך להזין אותיות בעברית ומספרים',
    arabic: 'يجب اضافه احرف بالعبريه واشارات فقط ',
    english: 'Please enter only letters and numbers'
  };
};

const hebrewExtended = () => {
  return {
    hebrew: 'יש להזין אותיות בעברית וסימנים בלבד',
    arabic: 'أدخل الحروف باللغة العبرية والأرقام',
    english: 'please enter Hebrew letters and symbols only'
  };
};

const freeHebrew = () => {
  return {
    hebrew: 'יש להזין אותיות בעברית, מספרים ותווים מיוחדים בלבד',
    arabic: '----',
    english: 'please enter Hebrew letters, digits and special symbols only'
  };
};

const noHebrewLetters = () => {
  return {
    hebrew: 'אין להזין אותיות בעברית',
    arabic: '----',
    english: 'Hebrew letters are not allowed'
  };
};

const english = () => {
  return {
    hebrew: 'עליך להזין אותיות לועזיות בלבד',
    arabic: 'أدخل فقط الحروف فقط',
    english: 'Please use only use Latin alphabet characters (A-Z, a-z).'
  };
};

const englishNumber = () => {
  return {
    hebrew: 'יש להזין אותיות לועזיות וספרות בלבד',
    arabic: '----',
    english: 'Please enter English letters and digits only'
  };
};

const englishExtended = () => {
  return {
    hebrew: 'יש להזין אותיות לועזיות וסימנים בלבד',
    arabic: '-----',
    english: 'please enter English letters and symbols only'
  };
};

const englishHebrew = () => {
  return {
    hebrew: 'יש להזין אותיות בעברית ואנגלית בלבד',
    arabic: '------',
    english: 'Please enter English and Hebrew letters only'
  };
};

const englishHebrewNumber = () => {
  return {
    hebrew: 'יש להזין אותיות בעברית, אנגלית וספרות בלבד',
    arabic: '-----',
    english: 'יש להזין אותיות בעברית, אנגלית וספרות בלבד'
  };
};

const apostropheAfterLetters = () => {
  return {
    hebrew: 'שימוש לא תקין בגרש',
    arabic: '------',
    english: 'Inappropriate usage of apostrophe'
  };
};

const noApostrophe = () => {
  return {
    hebrew: 'אין להזין גרש',
    arabic: "لا يمكن ادخال اقتباس (')",
    english: 'Apostrophe not allowed in this field'
  };
};

const noFinalLetters = () => {
  return {
    hebrew: 'אין להזין אותיות סופיות',
    arabic: 'لا يجب ادخال احرف نهائية في بداية او وسط الكلمة',
    english: 'Terminal letters are not allowed'
  };
};

const finalLetters = () => {
  return {
    hebrew: 'אין להזין אותיות סופיות בתחילת או באמצע מילה',
    arabic: 'لا يجب ادخال احرف نهائية في بداية او وسط الكلمة',
    english: 'Please enter terminal letters only at the end of the word'
  };
};

const startWithDigit = () => {
  return {
    hebrew: 'יש להזין ספרות תחילה',
    arabic: 'يجب إدخال الأرقام أولا',
    english: 'please enter digit first'
  };
};

const fileName = () => {
  return {
    hebrew: 'אין להזין את התווים /  : * ? " < > |',
    arabic: '------',
    english: 'the following chacactesr are not allowed /  : * ? " < > |'
  };
};

const freeText = () => {
  return {
    hebrew: 'אין אפשרות להזין את התווים (&,<,>)',
    arabic: '-------',
    english: 'the following chacactesr are not allowed (&,<,>)'
  };
};

export default {
  hebrew,
  hebrewNumber,
  hebrewExtended,
  freeHebrew,
  noHebrewLetters,
  english,
  englishNumber,
  englishExtended,
  englishHebrew,
  englishHebrewNumber,
  apostropheAfterLetters,
  noApostrophe,
  noFinalLetters,
  finalLetters,
  startWithDigit,
  fileName,
  freeText
};
