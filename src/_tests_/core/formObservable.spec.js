import formObservable from '../../core/formObservable';
import ValidationsManager from '../../validations/src/core/validationsManager';
import ComplexType from '../../core/ComplexType';

jest.mock('../../validations/src/core/validationsManager');
const validations = [() => true];
class complex extends ComplexType {
  constructor() {
    super();
  }
  @formObservable(validations) firstName = 'yael';
}

describe('formObservable export function that return decorator', () => {
  beforeEach(() => {
    // ValidationsManager.mockClear();
    complex.registerProperty = jest.fn();
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
    test('decorator return object', () => {
      expect(typeof complex.firstName).toBe('object');
    });
    test('registerPoperty is call', () => {
      expect(complex.registerProperty).toBeCalledWith({
        name: 'firstName',
        descriptor: complex.firstName,
        // validationsManager,
        isFormObservable: true
      });
    });
  });
});
