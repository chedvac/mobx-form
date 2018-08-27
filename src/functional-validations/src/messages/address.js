export default {
  url: () => {
    return {
      hebrew: `עליך להזין תחילת כתובת במבנה WWW או HTTP`,
      english: `Please enter a valid website address`,
      arabic: `الرجاء ادخال بداية عنوان في مبنى WWW أو HTTP`
    };
  },
  email: () => {
    return {
      hebrew: `עליך להזין כתובת אימייל תקנית באותיות לועזיות וללא רווחים, במבנה X@X.XX`,
      english: `Please enter a valid email address using Latin characters (a-z) and without spaces in the following format: X@X.XX. Example: abc@def.gh`,
      arabic: `يجب إدخال عنوان البريد الإلكتروني القياسي في الأحرف اللاتينية وبدون مسافات، في شكل X@X.XX`
    };
  },
  IPAddress: () => {
    return {
      hebrew: `כתובת IP לא תקינה, עליך להזין ספרות ונקודות בלבד`,
      english: `Please use digits 0-9 and "." only`,
      arabic: `يجب إدخال أرقام وفترات فقط`
    };
  },
  houseNumber: () => {
    return {
      hebrew: `אין אפשרות להזין תו זה`,
      english: `You can not use this character`,
      arabic: `لا يمكن إدخال هذا الحرف`
    };
  },
  apartment: () => {
    return {
      hebrew: `עליך להזין מספר דירה עד 4 ספרות בלבד`,
      english: `Please enter a 1-4 digit apartment number`,
      arabic: `يجب إدخال رقم شقة تصل إلى 4 أرقام فقط`
    };
  },
  mailbox: () => {
    return {
      hebrew: `עליך להזין תא דואר באורך 2 עד 5 ספרות`,
      english: `Please enter a 2-5 digit post office box number`,
      arabic: `يجب إدخال علبة بريد من 2 إلى 5 أرقام`
    };
  },
  zipCode: () => {
    return {
      hebrew: `עליך להזין מיקוד בן 7 ספרות`,
      english: `Please enter a 7 digit zip code`,
      arabic: `يجب إدخال رمز بريدي مكون من 7 أرقام`
    };
  }
};
