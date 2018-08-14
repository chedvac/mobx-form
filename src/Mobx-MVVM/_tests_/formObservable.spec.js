import formObservable from 'core/formObservable';
import ValidationsManager from 'validations/core/validationsManager';

jest.mock('../../validations/src/core/validationsManager');
const validations = [() => true];
class ComplexType {
  registerPropertyToPrototype() {}
}
class complex extends ComplexType {
  @formObservable({ validations })
  firstName = 'yael';
}

describe('formObservable export function that return decorator', () => {
  beforeEach(() => {
    complex.registerPropertyToPrototype = jest.fn();
  });
  test('typeof formObservable is function', () => {
    expect(typeof formObservable).toBe('function');
  });

  // test('call decorator function fail if parent is not instanceof ComplexType', () => {
  //   expect(() => {
  //     Parent.firstName();
  //   }).not.toThrow('formObservable parent must be instanceof ComplexType');
  // });

  describe('call formObservable as decorator', () => {
    test('inilize ValidationsManager', () => {
      expect(ValidationsManager.mock.instances.length).toBe(1);
    });
    test('pass to ValidationsManager constructor settings.validations', () => {
      expect(ValidationsManager.mock.instances[0]).toBe(1);
    });
    test('decorator return object', () => {
      expect(typeof complex.firstName).toBe('object');
    });
    test('registerPoperty is call', () => {
      expect(complex.registerProperty).toBeCalledWith({
        name: 'firstName',
        descriptor: complex.firstName,
        // validationsManager,
      });
    });
  });
});
