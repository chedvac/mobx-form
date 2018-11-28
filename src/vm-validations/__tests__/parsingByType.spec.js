import parsingByType from '../src/parsingByType';

describe('parsingByType', () => {
  test('should be defined', () => {
    expect(parsingByType).toBeDefined();
  });
  test('should be function', () => {
    expect(typeof parsingByType).toEqual('function');
  });

  describe('params', () => {});

  describe('parsed value', () => {
    describe('number', () => {
      test('valid value', () => {
        expect(parsingByType('5', Number).value).toEqual(5);
        expect(parsingByType('-5', Number).value).toEqual(-5);
        expect(parsingByType('5000', Number).value).toEqual(5000);
        expect(parsingByType('5.55', Number).value).toEqual(5.55);
        expect(parsingByType(5, Number).value).toEqual(5);
      });
      test('invalid value', () => {
        expect(parsingByType('aa', Number).value).toEqual(NaN);
        expect(parsingByType('5b', Number).value).toEqual(NaN);
        expect(parsingByType('5.5.5', Number).value).toEqual(NaN);
        // expect(parsingByType(true, Number).value).toEqual(NaN); ???
      });
    });
  });

  describe('boolean', () => {
    test('valid value', () => {
      expect(parsingByType('true', Boolean).value).toEqual(true);
      expect(parsingByType(true, Boolean).value).toEqual(true);
    });
    test('invalid value', () => {
      expect(parsingByType('false', Boolean).value).toEqual(false);
      expect(parsingByType(false, Boolean).value).toEqual(false);
    });
  });
});
