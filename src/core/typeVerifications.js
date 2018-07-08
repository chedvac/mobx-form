import checkPropTypes, { assertPropTypes } from 'check-prop-types';
import fail from './exeptions';
/**
 * @function "assertParametersType"
 * @description Call to assertPropTypes to assert that the values match with the type specs.
 * @param {object} parameters Runtime values that need to be type-checked
 * @param {object} types Map of PropType
 * @param {string} callerName Name of the function caller for error messages.
 * @param {?string} [term="parameter"] e.g. "prop", "arg" for error messages
 * @example 
 *    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      newVal: PropTypes.string
    };
    assertParametersType({ propertyName, newVal }, propTypes, 'validateProperty');
 *
 */
export default function assertParametersType(
  parameters,
  types,
  callerName,
  term = 'parameter'
) {
  if (!parameters || !types || !callerName) {
    fail(
      'One or more of the parameters sent to assertParametersType function are missing'
    );
  }
  assertPropTypes(types, parameters, term, callerName);
}
//TODO: implement by other library, adjust to production
// export function checkTypes(args, types, callerName = '') {
//   return checkPropTypes(types, args, term, callerName);
// }

// export function checkType(arg, type) {
//   return checkTypes({ arg: arg }, { arg: type }) ? false : true;
// }
