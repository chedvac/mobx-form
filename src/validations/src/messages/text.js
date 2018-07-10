const hebrew = () => {
  return {
    hebrew: 'עליך להזין אותיות בעברית',
    arabic: 'عليك كتابة الاحرف بالعبريه فقط ',
    english: 'Please use only use Hebrew  characters.'
  };
};

const english = () => {
  return {
    hebrew: 'עליך להזין אותיות לועזיות בלבד',
    arabic: 'أدخل فقط الحروف فقط',
    english: 'Please use only use Latin alphabet characters (A-Z, a-z).'
  };
};

export default {
  hebrew,
  english
};
