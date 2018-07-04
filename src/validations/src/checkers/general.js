export function required(value) {
  return value.length > 0;
}

export function maxlengthCheckers(value) {
  return val => val.length <= value;
}

export function minlenght(value) {
  return val => val.length >= value;
}
