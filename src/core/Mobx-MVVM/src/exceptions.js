import assertParametersType from 'core/typeVerifications';
import PropTypes from 'prop-types';

/**
    * @function "fail"
    * @description throw exception with the received messge
    * @param {string}  message
    * @example
    fail('property already exist');
    */
export default assertParametersType({message:PropTypes.string.isRequired},
  function fail(message){
  throw message;
})

