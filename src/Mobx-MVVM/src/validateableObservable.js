import ComplexType from 'core/complexType';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default function validateableObservable(settings = {}) {
  return assertParametersType(
    {
      target: PropTypes.instanceOf(ComplexType)
    },
    function validateableObservableDecorator(target, name, descriptor) {
    
      const defaultValue = descriptor.value
        ? descriptor.value
        : descriptor.initializer
          ? descriptor.initializer.call(target)
          : undefined;
      target.setValidateableObservableSettings({
        name,
        defaultValue,
        ...settings
      });
     
      return Object.getOwnPropertyDescriptor(target, name);
    }
  );
}
