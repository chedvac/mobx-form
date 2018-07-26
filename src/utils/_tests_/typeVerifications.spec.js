import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
const checkPropTypes = require('check-prop-types');
jest.spyOn(checkPropTypes, 'assertPropTypes');

describe('assertParametersType', () => {
  test('assertParametersType is defined', () => {
    expect(assertParametersType).toBeDefined();
  });
  test('types object is mandatory ', () => {
    expect(() => {
      assertParametersType();
    }).toThrow();
  });
  test('call to assertPropTypes ', () => {
    const mockFn = jest.fn();
    const functionToCheck = assertParametersType(
      { message: PropTypes.string.isRequired },
      mockFn
    );
    functionToCheck('error message');
    expect(checkPropTypes.assertPropTypes).toHaveBeenCalled();
  });
  describe('Decorators', () => {
    const functionContent = jest.fn();
    class A {
      @assertParametersType({ message: PropTypes.string.isRequired })
      functionToCheck(message) {
        functionContent(message);
      }
    }
    beforeEach(() => {
      functionContent.mockClear();
    });
    test('if parameter match the types the orginal function is called', () => {
      const a = new A();
      a.functionToCheck('error message');
      expect(functionContent).toHaveBeenCalled();
    });
    test('if parameter not match the types the orginal function isn\'t called', () => {
      const a = new A();
      try {
        a.functionToCheck(true);
      } catch (e) { 
        // catch the error
      }
      expect(functionContent).not.toHaveBeenCalled();
    });
  });
  describe('HighOrderFunction', () => {
    const functionContent = jest.fn();
    test('if parameter match the types the orginal function is called', () => {
      const mockFn = jest.fn().mockImplementation(message => {functionContent(message);});
      const functionToCheck = assertParametersType(
        { message: PropTypes.string.isRequired },
        mockFn
      );
      functionToCheck('error message');
      expect(mockFn).toHaveBeenCalled();
    });
    test('if parameter not match the types the orginal function isn\'t called', () => {
      const mockFn = jest.fn().mockImplementation(message => {functionContent(message);});
      const functionToCheck = assertParametersType(
        { message: PropTypes.string.isRequired },
        mockFn
      );
      try {
        functionToCheck(true);
      } catch (e) {
        // catch the error
      }
      expect(mockFn).not.toHaveBeenCalled();
    });

    test('assert by custom type example', () => {
      const parameterShouldBeUpperCase = 'ABC';
      const propTypes = {
        parameterShouldBeUpperCase(props, parameterName, callerName) {
          if (!/[A-Z]/.test(props[parameterName])) {
            return new Error(
              `Invalid parameter ${parameterName} supplied to function ${callerName} . Validation failed.`
            );
          }
          return null;
        }
      };
      const mockFn = jest
        .fn()
        .mockImplementation(parameterShouldBeUpperCase => {functionContent(parameterShouldBeUpperCase);});
      const functionToCheck = assertParametersType(propTypes, mockFn);
      functionToCheck(parameterShouldBeUpperCase);
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
