import validationsManagerFactory from '../validations/src/core/validationsManager';
import { registerProperty } from './complexPropertiesRegistration';
export default function formObservable(settings = {}) {
  const validationsManager = new validationsManagerFactory(
    settings.validations || []
  );
  return function(target, name, descriptor) {
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
