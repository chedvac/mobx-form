import validateableObservable from 'core/validateableObservable';
import ValidationsManager from 'validations/core/validationsManager';

jest.mock('../../validations/src/core/validationsManager');
const validations = [() => true];
class ComplexType {
  registerPropertyToPrototype() {}
}
class complex extends ComplexType {
  @validateableObservable({ validations })
  firstName = 'yael';
}

describe('validateableObservable export function that return decorator', () => {
  beforeEach(() => {
    complex.registerPropertyToPrototype = jest.fn();
  });
  test('typeof validateableObservable is function', () => {
    expect(typeof validateableObservable).toBe('function');
  });

  // test('call decorator function fail if parent is not instanceof ComplexType', () => {
  //   expect(() => {
  //     Parent.firstName();
  //   }).not.toThrow('validateableObservable parent must be instanceof ComplexType');
  // });

  describe('call validateableObservable as decorator', () => {
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
