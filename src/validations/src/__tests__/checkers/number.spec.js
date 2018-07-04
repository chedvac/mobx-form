import { greaterThanRule } from '../../Rules/number';

describe('greaterThanRule', () => {
  test('should be defined', () => {
    expect(greaterThanRule).toBeDefined();
  });

  describe('params', () => {
    test('undefined null or empty should return true', () => {
      expect(greaterThanRule()(7)).toBeTruthy();
      // expect(greaterThanRule(null)(7)).toBeTruthy();
      expect(greaterThanRule(undefined)(7)).toBeTruthy();
      expect(greaterThanRule('')(7)).toBeTruthy();
    });

    test('empty object or object without number should return true', () => {
      expect(greaterThanRule({})(7)).toBeTruthy();
      expect(greaterThanRule({ num: 1 })(7)).toBeTruthy();
    });

    test('number is undefined null or empty should return true', () => {
      expect(greaterThanRule({ number: undefined })(7)).toBeTruthy();
      expect(greaterThanRule({ number: null })(7)).toBeTruthy();
      expect(greaterThanRule({ number: '' })(7)).toBeTruthy();
    });

    test('number is not numeric should return true ', () => {
      expect(greaterThanRule({ number: 'abc' })(7)).toBeTruthy();
      expect(greaterThanRule({ number: '12ab' })(7)).toBeTruthy();
    });

    test('string numeric id valid ', () => {
      expect(greaterThanRule({ number: '10' })(7)).toBeFalsy();
    });

    test('decimal numeric id valid ', () => {
      expect(greaterThanRule({ number: '10.5' })(7)).toBeFalsy();
      expect(greaterThanRule({ number: 10.5 })(7)).toBeFalsy();
    });
  });

  describe('val', () => {
    test('undefined null or empty should return true', () => {
      expect(greaterThanRule({ number: 2 })()).toBeTruthy();
      expect(greaterThanRule({ number: 2 })(null)).toBeTruthy();
      expect(greaterThanRule({ number: 2 })(undefined)).toBeTruthy();
      expect(greaterThanRule({ number: 2 })('')).toBeTruthy();
    });

    test('cant parsed to float should return true', () => {
      expect(greaterThanRule({ number: 2 })('abc')).toBeTruthy();
      expect(greaterThanRule({ number: 2 })('12ab')).toBeTruthy();
    });
  });

  describe('params & val is valid', () => {
    test('value valid', () => {
      expect(greaterThanRule({ number: 10 })(15)).toBeTruthy();
      expect(greaterThanRule({ number: '10' })(15)).toBeTruthy();
      expect(greaterThanRule({ number: 10 })('15')).toBeTruthy();
      expect(greaterThanRule({ number: 20.55 })(100000)).toBeTruthy();
    });

    test('value less than or equal', () => {
      expect(greaterThanRule({ number: 20 })('20')).toBeFalsy();
      expect(greaterThanRule({ number: 20 })(20)).toBeFalsy();
      expect(greaterThanRule({ number: 20 })('10')).toBeFalsy();
      expect(greaterThanRule({ number: 20 })(10)).toBeFalsy();
    });
  });
});
