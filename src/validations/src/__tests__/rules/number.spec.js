import { greaterThan, lessThan } from '../../rules/number';
import { testPropTypes } from '../common/testPropTypes';

function testParams(functionName) {
  describe('value', () => {
    test('should throw if not exist', () => {
      expect(() => {
        functionName({});
      }).toThrow();
    });
    test('should throw if not number', () => {
      testPropTypes(functionName, 'value', 'number');
    });
  });

  describe('compareToName', () => {
    test('should not throw if not exist (optional)', () => {
      expect(() => {
        functionName({ value: 1 });
      }).not.toThrow();
    });
    test('should throw if not string', () => {
      testPropTypes(functionName, 'compareToName', 'string');
    });
  });

  describe('message', () => {
    test('should not throw if not exist (optional)', () => {
      expect(() => {
        functionName({ value: 1 });
      }).not.toThrow();
    });
    test('should throw if not function', () => {
      testPropTypes(functionName, 'message', 'function');
    });
  });
}

describe('greaterThan', () => {
  test('shuold be defined', () => {
    expect(greaterThan).toBeDefined();
  });

  describe('params', () => {
    testParams(greaterThan);
  });
});

describe('lessThan', () => {
  test('shuold be defined', () => {
    expect(lessThan).toBeDefined();
  });

  describe('params', () => {
    testParams(lessThan);
  });
});
