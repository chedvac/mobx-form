import { greaterThan, lessThan } from '../../rules/number';

describe('greaterThan', () => {
  test('shuold be defined', () => {
    expect(greaterThan).toBeDefined();
  });

  describe('params', () => {
    describe('value', () => {
      test('should throw if not exist', () => {
        expect(() => {
          greaterThan({});
        }).toThrow();
      });
      test('should throw if not number', () => {
        expect(() => {
          greaterThan({ value: null });
        }).toThrow();
        expect(() => {
          greaterThan({ value: undefined });
        }).toThrow();
        expect(() => {
          greaterThan({ value: '' });
        }).toThrow();
        expect(() => {
          greaterThan({ value: '1' });
        }).toThrow();
        expect(() => {
          greaterThan({ value: 'string' });
        }).toThrow();
      });
    });

    describe('compareToName', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          greaterThan({ value: 1 });
        }).not.toThrow();
      });
      test('should throw if not string', () => {
        // expect(() => {
        //   greaterThan({ value: 1, compareToName: undefined });
        // }).toThrow();
        expect(() => {
          greaterThan({ value: 1, compareToName: 1 });
        }).toThrow();
        expect(() => {
          greaterThan({ value: 1, compareToName: () => 'string' });
        }).toThrow();
        expect(() => {
          greaterThan({ value: 1, compareToName: 'string' });
        }).not.toThrow();
      });
    });

    describe('message', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          greaterThan({ value: 1 });
        }).not.toThrow();
      });
      test('should throw if not function', () => {
        // expect(() => {
        //   greaterThan({ value: 1, message: undefined });
        // }).toThrow();
        expect(() => {
          greaterThan({ value: 1, message: 1 });
        }).toThrow();
        expect(() => {
          greaterThan({ value: 1, message: 'string' });
        }).toThrow();
        expect(() => {
          greaterThan({ value: 1, message: () => 'string' });
        }).not.toThrow();
      });
    });
  });
});
