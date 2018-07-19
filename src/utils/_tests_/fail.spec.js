import fail from 'utils/fail';

describe('fail method', () => {
  test('is defined', () => {
    expect(fail).toBeDefined();
  });
  test('throw the recieved error', () => {
    expect(() => {
      fail('error message');
    }).toThrow('error message');
  });
});
