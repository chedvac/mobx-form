/**
    * @function "fail"
    * @description throw exception with the received messge
    * @param {string}  message
    * @example
    fail('property already exist');
    */
export default function fail(message) {
  throw message;
}
