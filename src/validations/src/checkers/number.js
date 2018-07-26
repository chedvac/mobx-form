export function greaterThanChecker(params = {}) {
  let { value } = params;
  return val => {
    if (!value || isNaN(value.toString())) {
      return true;
    }
    value = parseFloat(value);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val > value;
  };
}

export function lessThanChecker(params = {}) {
  let { number } = params;
  return val => {
    if (!number || isNaN(number.toString())) {
      return true;
    }
    number = parseFloat(number);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val < number;
  };
}
