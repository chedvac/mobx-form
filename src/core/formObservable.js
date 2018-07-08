import ComplexType from '../core/ComplexType';
import validationsManagerFactory from '../validations/src/core/validationsManager';
export default function formObservable(settings = {}) {
  const validationsManager = new validationsManagerFactory(
    settings.validations || []
  );
  return function(target, name, descriptor) {
    if (!(target instanceof ComplexType)) {
      throw 'formObservable parent must be instanceof ComplexType';
    }
    const defaultValue = descriptor.value
      ? descriptor.value
      : descriptor.initializer
        ? descriptor.initializer.call(target)
        : undefined;
    target.setPropertySettings({
      name,
      defaultValue,
      validationsManager,
      isFormObservable: true,
      descriptor
    });
    return Object.defineProperty(target, name, {
      configurable: true,
      enumerable: true,
      get: function() {
        return this[name];
      },
      set: function(value) {
        this[name] = value;
      }
    });
  };
}
