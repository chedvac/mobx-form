import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/ModularViewModel';

const reset = () => true;
const descriptor = {
  configurable: false,
  enumerable: true,
  value: 'fff',
  writable: true
};
describe('modelMember ', () => {
  test('typeof modelMember is function', () => {
    expect(typeof modelMember).toBe('function');
  });
  test('register defaultValue to setModelMemberSettings ', () => {
    class classA extends ModularViewModel {}
    const a = new classA();
    a.setModelMemberSettings = jest.fn();
    modelMember({ reset })(a, 'firstName', descriptor);
    expect(a.setModelMemberSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'firstName',
        defaultValue: 'fff'
      })
    );
  });

  test('register  settings to setModelMemberSettings ', () => {
    class classA extends ModularViewModel {}
    const a = new classA();
    a.setModelMemberSettings = jest.fn();
    modelMember({ reset })(a, 'firstName', descriptor);
    expect(a.setModelMemberSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'firstName',
        reset
      })
    );
  });
  test('call decorator function fail if parent is not instanceof ModularViewModel', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      class classB {
        @modelMember()
        firstName = 'fff';
      }
    }).toThrow();
  });
  test('change writable and configurable to true', () => {
    class classB extends ModularViewModel {
      @modelMember()
      firstName = 'fff';
    }
    const b = new classB();
    expect(
      Object.getOwnPropertyDescriptor(b, 'firstName').writable
    ).toBeTruthy();
    expect(
      Object.getOwnPropertyDescriptor(b, 'firstName').configurable
    ).toBeTruthy();
  });
});
