import ComplexType from 'core/ComplexType';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default function validateableObservable(settings = {}) {
  return assertParametersType(
    { target: PropTypes.instanceOf(ComplexType) },
    function(target, name, descriptor) {
      assertParametersType('@validateableObservable');
      descriptor.configurable = true;
      descriptor.writable = true;
      const defaultValue = descriptor.value
        ? descriptor.value
        : descriptor.initializer
          ? descriptor.initializer.call(target)
          : undefined;
      target.setValidateableObservableSettings({
        name,
        defaultValue,
        descriptor,
        ...settings
      });
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: true,
        get: () => target[name],

        set: value => {
          target[name] = value;
        }
      });
      return Object.getOwnPropertyDescriptor(target, name);
    }
  );
}
