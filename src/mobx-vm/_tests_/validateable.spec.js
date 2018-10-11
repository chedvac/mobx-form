import validateable from 'mobx-vm/validateable';
import ModularViewModel from 'mobx-vm/modularViewModel';

const validations = [() => true];

describe('validateable ', () => {
  test('typeof validateable is function', () => {
    expect(typeof validateable).toBe('function');
  });

  test('register settings to setValidateableSettings ', () => {
    class classA extends ModularViewModel {}
    const a = new classA();
    a.setValidateableSettings = jest.fn();
    validateable({ validations })(a, 'firstName');
    expect(a.setValidateableSettings).toHaveBeenCalledWith({
      name: 'firstName',
      validations
    });
  });
  test('call decorator function fail if parent is not instanceof ModularViewModel', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      class classB {
        @validateable()
        firstName = 'fff';
      }
    }).toThrow();
  });
});
