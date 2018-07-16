import fail from 'core/exceptions';

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
