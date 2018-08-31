import validateable from 'core/validateable';
import ValidationsManager from 'validations/core/validationsManager';

jest.mock('../../validations/src/core/validationsManager');
const validations = [() => true];
class ModularViewModel {
  registerPropertyToPrototype() {}
}
class complex extends ModularViewModel {
  @validateable({ validations })
  firstName = 'yael';
}

describe('validateable export function that return decorator', () => {
  beforeEach(() => {
    complex.registerPropertyToPrototype = jest.fn();
  });
  test('typeof validateable is function', () => {
    expect(typeof validateable).toBe('function');
  });

  // test('call decorator function fail if parent is not instanceof ModularViewModel', () => {
  //   expect(() => {
  //     Parent.firstName();
  //   }).not.toThrow('validateable parent must be instanceof ModularViewModel');
  // });

  describe('call validateable as decorator', () => {
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
        descriptor: complex.firstName
        // validationsManager,
      });
    });
  });
});
