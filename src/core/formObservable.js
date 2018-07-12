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
      validationsManager,
      isFormObservable: true,
      descriptor
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
