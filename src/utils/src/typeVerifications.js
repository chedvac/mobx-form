import { assertPropTypes } from 'check-prop-types';
import fail from 'utils/fail';
import { type } from 'os';
/**
 * @function "assertParametersType"
 * @description return function that calls assertPropTypes to assert the function parameters match the recieved types.
 *  and call the orginal function
 * @param {object} types object of PropType witch keys must be match the function parameters names
 * @param {function} wrappedFunction use for highOrderFunction.
 * @example for decorator
 *   @assertParametersType({
    propertyName: PropTypes.string.isRequired,
    newProperty: PropTypes.oneOfType([
      PropTypes.instanceOf(FormObservableBehavior),
      PropTypes.instanceOf(ModelPropBehavior)
    ])
  })
  createProperty(propertyName, newProperty) {
    ...
  }
 *
 * @example for HighOrderFunction
 *  export default assertParametersType({message:PropTypes.string.isRequired},
      function fail(message){
      ...
    })
 *
 */

export default function assertParametersType(types, wrappedFunction) {
  if (!types) {
    fail('The parameter types is mandatory in assertParametersType');
  }
  return typeof wrappedFunction === 'function'
    ? assertByHighOrderFunction(types, wrappedFunction)
    : assertByDecorator(types);
}
function assertByHighOrderFunction(types, wrappedFunction) {
  return wrapperFunction(types, wrappedFunction, wrappedFunction.name);
}
function assertByDecorator(types) {
  return function(t, key, descriptor) {
    descriptor.value = wrapperFunction(types, descriptor.value, key);
  };
}
const mergeArgumentsWithTypes = (types, args) => {
  const parameters = {};
  Object.keys(types).forEach((key, index) => {
    parameters[key] = args[index];
  });
  return parameters;
};
function wrapperFunction(types, orginalFunction, functionName) {
  return function(...args) {
    const term = 'parameter';
    const parameters = mergeArgumentsWithTypes(types, args);
    assertPropTypes(types, parameters, term, functionName);
    return orginalFunction.apply(this, args);
  };
}
function assertByDecorator(types) {
  return function(t, key, descriptor) {
    descriptor.value = wrapperFunction(types, descriptor.value, key);
  };
}
function assertByHighOrderFunction(types, wrappedFunction) {
  return wrapperFunction(types, wrappedFunction, wrappedFunction.name);
}
