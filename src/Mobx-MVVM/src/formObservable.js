import ComplexType from 'core/ComplexType';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default function formObservable(settings = {}) {

  return function(target, name, descriptor) {
    assertParametersType(
      { target },
      { target: PropTypes.instanceOf(ComplexType) },
      '@formObservable'
    );
    descriptor.configurable = true;
    descriptor.writable = true;
    const defaultValue = descriptor.value
      ? descriptor.value
      : descriptor.initializer
        ? descriptor.initializer.call(target)
        : undefined;
    target.setPropertySettings({
      name,
      defaultValue,
      isFormObservable: true,
      descriptor,
      ...settings
    });
    Object.defineProperty(target, name, {
      configurable: true,
      enumerable: true,
      get: () => defaultValue,
      set: value => {
        this[name] = value;
      }
    });
    return Object.getOwnPropertyDescriptor(target, name);
  };
}
