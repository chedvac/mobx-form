import { greaterThanChecker, lessThanChecker } from '../../checkers/number';

describe('greaterThanChecker', () => {
  test('should be defined', () => {
    expect(greaterThanChecker).toBeDefined();
  });

  describe('params', () => {
    test('undefined null or empty should return true', () => {
      expect(greaterThanChecker()(7)).toBeTruthy();
      // expect(greaterThanChecker(null)(7)).toBeTruthy();
      expect(greaterThanChecker(undefined)(7)).toBeTruthy();
      expect(greaterThanChecker('')(7)).toBeTruthy();
    });

    test('empty object or object without number should return true', () => {
      expect(greaterThanChecker({})(7)).toBeTruthy();
      expect(greaterThanChecker({ num: 10 })(7)).toBeTruthy();
    });

    test('number is undefined null or empty should return true', () => {
      expect(greaterThanChecker({ number: undefined })(7)).toBeTruthy();
      expect(greaterThanChecker({ number: null })(7)).toBeTruthy();
      expect(greaterThanChecker({ number: '' })(7)).toBeTruthy();
    });

    test('number is not numeric should return true ', () => {
      expect(greaterThanChecker({ number: 'abc' })(7)).toBeTruthy();
      expect(greaterThanChecker({ number: '12ab' })(7)).toBeTruthy();
    });

    test('string numeric is valid ', () => {
      expect(greaterThanChecker({ number: '10' })(7)).toBeFalsy();
    });

    test('decimal numeric is valid ', () => {
      expect(greaterThanChecker({ number: '10.5' })(7)).toBeFalsy();
      expect(greaterThanChecker({ number: 10.5 })(7)).toBeFalsy();
    });
  });

  describe('val', () => {
    test('undefined null or empty should return true', () => {
      expect(greaterThanChecker({ number: 2 })()).toBeTruthy();
      expect(greaterThanChecker({ number: 2 })(null)).toBeTruthy();
      expect(greaterThanChecker({ number: 2 })(undefined)).toBeTruthy();
      expect(greaterThanChecker({ number: 2 })('')).toBeTruthy();
    });

    test('cant parsed to float should return true', () => {
      expect(greaterThanChecker({ number: 2 })('abc')).toBeTruthy();
      expect(greaterThanChecker({ number: 2 })('12ab')).toBeTruthy();
    });
  });

  describe('params & val is valid', () => {
    test('value valid', () => {
      expect(greaterThanChecker({ number: 10 })(15)).toBeTruthy();
      expect(greaterThanChecker({ number: '10' })(15)).toBeTruthy();
      expect(greaterThanChecker({ number: 10 })('15')).toBeTruthy();
      expect(greaterThanChecker({ number: 20.55 })(100000)).toBeTruthy();
    });

    test('value less than or equal', () => {
      expect(greaterThanChecker({ number: 20 })('20')).toBeFalsy();
      expect(greaterThanChecker({ number: 20 })(20)).toBeFalsy();
      expect(greaterThanChecker({ number: 20 })('10')).toBeFalsy();
      expect(greaterThanChecker({ number: 20 })(10)).toBeFalsy();
    });
  });
});

describe('lessThanChecker', () => {
  test('should be defined', () => {
    expect(lessThanChecker).toBeDefined();
  });

  describe('params', () => {
    test('undefined null or empty should return true', () => {
      expect(lessThanChecker()(7)).toBeTruthy();
      // expect(lessThanChecker(null)(7)).toBeTruthy();
      expect(lessThanChecker(undefined)(7)).toBeTruthy();
      expect(lessThanChecker('')(7)).toBeTruthy();
    });

    test('empty object or object without number should return true', () => {
      expect(lessThanChecker({})(7)).toBeTruthy();
      expect(lessThanChecker({ num: 10 })(7)).toBeTruthy();
    });

    test('number is undefined null or empty should return true', () => {
      expect(lessThanChecker({ number: undefined })(7)).toBeTruthy();
      expect(lessThanChecker({ number: null })(7)).toBeTruthy();
      expect(lessThanChecker({ number: '' })(7)).toBeTruthy();
    });

    test('number is not numeric should return true ', () => {
      expect(lessThanChecker({ number: 'abc' })(7)).toBeTruthy();
      expect(lessThanChecker({ number: '12ab' })(7)).toBeTruthy();
    });

    test('string numeric is valid ', () => {
      expect(lessThanChecker({ number: '10' })(20)).toBeFalsy();
    });

    test('decimal numeric is valid ', () => {
      expect(lessThanChecker({ number: '10.5' })(20)).toBeFalsy();
      expect(lessThanChecker({ number: 10.5 })(20)).toBeFalsy();
    });
  });

  describe('val', () => {
    test('undefined null or empty should return true', () => {
      expect(lessThanChecker({ number: 2 })()).toBeTruthy();
      expect(lessThanChecker({ number: 2 })(null)).toBeTruthy();
      expect(lessThanChecker({ number: 2 })(undefined)).toBeTruthy();
      expect(lessThanChecker({ number: 2 })('')).toBeTruthy();
    });

    test('cant parsed to float should return true', () => {
      expect(lessThanChecker({ number: 2 })('abc')).toBeTruthy();
      expect(lessThanChecker({ number: 2 })('ab12')).toBeTruthy();
    });
  });

  describe('params & val is valid', () => {
    test('value valid', () => {
      expect(lessThanChecker({ number: 10 })(5)).toBeTruthy();
      expect(lessThanChecker({ number: '10' })(5)).toBeTruthy();
      expect(lessThanChecker({ number: 10 })('5')).toBeTruthy();
      expect(lessThanChecker({ number: 20.55 })(5)).toBeTruthy();
    });

    test('value less than or equal', () => {
      expect(lessThanChecker({ number: 20 })('3330')).toBeFalsy();
      expect(lessThanChecker({ number: 20 })(30)).toBeFalsy();
      expect(lessThanChecker({ number: 20 })('30')).toBeFalsy();
      expect(lessThanChecker({ number: 20.5 })(30.123)).toBeFalsy();
    });
  });
});
