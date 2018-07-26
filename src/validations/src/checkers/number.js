export function greaterThanChecker(params = {}) {
  // return (params)=> {
  let { number } = params;
  // if (typeof(number)==="function"){
  //   number =number();
  // }
  return val => {
    if (!number || isNaN(number.toString())) {
      return true;
    }
    number = parseFloat(number);
    val = parseFloat(val);
    if (isNaN(val)) {
      return true;
    }
    return val > number;
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
