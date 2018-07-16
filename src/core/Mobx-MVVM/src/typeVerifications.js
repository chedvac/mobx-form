import { assertPropTypes } from 'check-prop-types';
import fail from 'core/exceptions';
/**
 * @function "assertParametersType"
 * @description Decorator that calls assertPropTypes to assert the function parameters match with the type specs.
 * @param {object} types object of PropType witch keys match function parameters names
 * @example 
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
 */
export default function assertParametersType(types) {
  return function(target, key, descriptor) {
    const term = 'parameter';
    const original = descriptor.value;
    if (!types) {
      fail(
        'The parameter types is mandatory in assertParametersType'
      );
    }
    descriptor.value = function(...args) {    
      const parameters = mergeArgumentsWithTypes(types,args);  
      assertPropTypes(types, parameters, term, key);
      original.apply(this, args);
    }
  };
}
const mergeArgumentsWithTypes=(types,args)=> {
  const parameters={};
  Object.keys(types).forEach((key,index)=>{
  parameters[key] = args[index]
  });
  return parameters;
}
