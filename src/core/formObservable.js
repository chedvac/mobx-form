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
    target.registerProperty({
      name,
      descriptor,
      validationsManager,
      isFormObservable: true
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
