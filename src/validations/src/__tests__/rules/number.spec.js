import {
  number,
  integer,
  decimal,
  greaterThan,
  lessThan
} from '../../rules/number';
import { testPropTypes } from '../common/testPropTypes';

describe('number', () => {
  test('shuold be defined', () => {
    expect(number).toBeDefined();
  });
  test('shuold be function', () => {
    expect(typeof number).toBe('function');
  });
  describe('params', () => {
    test('can be null or undefined', () => {
      expect(() => {
        number(null);
      }).not.toThrow();
      expect(() => {
        number(undefined);
      }).not.toThrow();
    });
    describe('message', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          number({});
        }).not.toThrow();
      });
      test('should throw if not function', () => {
        testPropTypes(number, 'message', 'func');
      });
    });
  });

  describe('validator', () => {
    describe('value valid', () => {
      test('numeric', () => {
        expect(number().validator(1)).toBeTruthy();
        expect(number().validator(100)).toBeTruthy();
      });
      test('string numeric', () => {
        expect(number().validator('1')).toBeTruthy();
        expect(number().validator('100')).toBeTruthy();
        expect(number().validator('10.5')).toBeTruthy();
      });
      test('negative numeric', () => {
        expect(number().validator(-1)).toBeTruthy();
        expect(number().validator(-100)).toBeTruthy();
        expect(number().validator('-100')).toBeTruthy();
      });
      test('decimal numeric', () => {
        expect(number().validator(10.5)).toBeTruthy();
        expect(number().validator(1000.1234)).toBeTruthy();
        expect(number().validator(-100.1234)).toBeTruthy();
      });
    });

    test('value not valid', () => {
      expect(number().validator('abc')).toBeFalsy();
      expect(number().validator('אבג')).toBeFalsy();
      expect(number().validator('1a')).toBeFalsy();
      expect(number().validator('100.a')).toBeFalsy();
      expect(number().validator('-1+9')).toBeFalsy();
      expect(number().validator('false')).toBeFalsy();
    });
  });
});

describe('integer', () => {
  test('shuold be defined', () => {
    expect(integer).toBeDefined();
  });
  test('shuold be function', () => {
    expect(typeof integer).toBe('function');
  });
  describe('params', () => {
    test('can be null or undefined', () => {
      expect(() => {
        integer(null);
      }).not.toThrow();
      expect(() => {
        integer(undefined);
      }).not.toThrow();
    });
    describe('message', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          integer({});
        }).not.toThrow();
      });
      test('should throw if not function', () => {
        testPropTypes(integer, 'message', 'func');
      });
    });
  });

  describe('validator', () => {
    test('value valid', () => {
      expect(integer().validator(1)).toBeTruthy();
      expect(integer().validator(1000000000000000)).toBeTruthy();
      expect(integer().validator('1')).toBeTruthy();
      expect(integer().validator('1000000000000000')).toBeTruthy();
      expect(integer().validator(-1)).toBeTruthy();
      expect(integer().validator(-1000000000000000)).toBeTruthy();
      expect(integer().validator('-1')).toBeTruthy();
      expect(integer().validator('-1000000000000000')).toBeTruthy();
    });

    test('value not valid', () => {
      expect(integer().validator(10.5)).toBeFalsy();
      expect(integer().validator('10.5')).toBeFalsy();
      expect(integer().validator(-10.5)).toBeFalsy();
      expect(integer().validator('-10.5')).toBeFalsy();
      expect(integer().validator('abc')).toBeFalsy();
      expect(integer().validator('אבג')).toBeFalsy();
      expect(integer().validator('1a')).toBeFalsy();
      expect(integer().validator('100.a')).toBeFalsy();
      expect(integer().validator('-1+9')).toBeFalsy();
      expect(integer().validator(true)).toBeFalsy();
    });
  });
});

describe('decimal', () => {
  test('shuold be defined', () => {
    expect(decimal).toBeDefined();
  });
  test('shuold be function', () => {
    expect(typeof decimal).toBe('function');
  });
  describe('params', () => {
    test('can be null or undefined', () => {
      expect(() => {
        decimal(null);
      }).not.toThrow();
      expect(() => {
        decimal(undefined);
      }).not.toThrow();
    });
    describe('message', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          decimal({});
        }).not.toThrow();
      });
      test('should throw if not function', () => {
        testPropTypes(decimal, 'message', 'func');
      });
    });
  });

  describe('validator', () => {
    test('value valid', () => {
      expect(decimal().validator(1)).toBeTruthy();
      expect(decimal().validator(1000000.0)).toBeTruthy();
      expect(decimal().validator('1')).toBeTruthy();
      expect(decimal().validator('10000000.00000000')).toBeTruthy();
      expect(decimal().validator(10.5)).toBeTruthy();
      expect(decimal().validator('10.5')).toBeTruthy();
    });

    test('value not valid', () => {
      expect(decimal().validator(-1)).toBeFalsy();
      expect(decimal().validator(-10.5)).toBeFalsy();
      expect(decimal().validator('-10.5')).toBeFalsy();
      expect(decimal().validator('-10.5.1')).toBeFalsy();
      expect(decimal().validator('10.5.312')).toBeFalsy();
      expect(decimal().validator('abc')).toBeFalsy();
      expect(decimal().validator('אבג')).toBeFalsy();
      expect(decimal().validator('1a')).toBeFalsy();
      expect(decimal().validator('100.a')).toBeFalsy();
      expect(decimal().validator('-1+9')).toBeFalsy();
      expect(decimal().validator(true)).toBeFalsy();
    });
  });
});

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
        testPropTypes(greaterThan, 'value', 'number');
      });
    });

    describe('compareToName', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          greaterThan({ value: 1 });
        }).not.toThrow();
      });
      test('should throw if not string', () => {
        testPropTypes(greaterThan, 'compareToName', 'string');
      });
    });

    describe('message', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          greaterThan({ value: 1 });
        }).not.toThrow();
      });
      test('should throw if not function', () => {
        testPropTypes(greaterThan, 'message', 'function');
      });
    });
  });
});

describe('lessThan', () => {
  test('shuold be defined', () => {
    expect(lessThan).toBeDefined();
  });

  describe('params', () => {
    describe('value', () => {
      test('should throw if not exist', () => {
        expect(() => {
          lessThan({});
        }).toThrow();
      });
      test('should throw if not number', () => {
        testPropTypes(lessThan, 'value', 'number');
      });
    });

    describe('compareToName', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          lessThan({ value: 1 });
        }).not.toThrow();
      });
      test('should throw if not string', () => {
        testPropTypes(lessThan, 'compareToName', 'string');
      });
    });

    describe('message', () => {
      test('should not throw if not exist (optional)', () => {
        expect(() => {
          lessThan({ value: 1 });
        }).not.toThrow();
      });
      test('should throw if not function', () => {
        testPropTypes(lessThan, 'message', 'function');
      });
    });
  });
});
