import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

const messages = {
  number: {
    hebrew: 'TYPE: עליך להזין ערך מספרי בלבד'
  },
  date: {
    hebrew: 'TYPE: עליך להזין תאריך בפורמט תקין'
  }
};

const booleanValue = {
  //???
  true: true,
  yes: true,
  '1': true,
  false: false,
  no: false,
  '0': false,
  null: false
};

const enumfunction = {
  boolean: value => booleanValue[value.toString().toLowerCase()],
  date: value => Date.parse(value),
  number: value => Number(value), // !isNaN(value) // +value //regex
  string: value => String(value)
};

export default assertParametersType(
  {
    value: PropTypes.any,
    parseType: PropTypes.func
  },
  function parsingByType(value, parseType = String) {
    parseType = parseType.name.toLowerCase();
    const parsedValue = enumfunction[parseType](value);
    const successParsed =
      parseType === 'boolean' ? parsedValue !== undefined : parsedValue;

    return {
      validationState: {
        isValid: successParsed ? true : false,
        message: successParsed ? '' : messages[parseType].hebrew
      },
      value: parsedValue
    };
  }
);
