import ComplexType from 'core/complexType';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default function validateable(settings = {}) {
  return assertParametersType(
    {
      target: PropTypes.instanceOf(ComplexType)
    },
    function validateableDecorator(target, name, descriptor) {
    
      const defaultValue = descriptor.value
        ? descriptor.value
        : descriptor.initializer
          ? descriptor.initializer.call(target)
          : undefined;
      target.setValidateableSettings({
        name,
        defaultValue,
        ...settings
      });
     
      return Object.getOwnPropertyDescriptor(target, name);
    }
  );
}
