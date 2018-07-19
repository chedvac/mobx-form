import assertParametersType from 'utils/typeVerifications';
import { assertPropTypes } from 'check-prop-types';
import PropTypes from 'prop-types';
jest.mock('check-prop-types');

describe('assertParametersType', () => {
  test('assertParametersType is defined', () => {
    expect(assertParametersType).toBeDefined();
  });
  test('parameters are mandatory', () => {
    expect(() => {
      assertParametersType();
    }).toThrow();
  });
  test('call to assertPropTypes', () => {
    assertParametersType(
      { propertyName: 'ddd' },
      { propertyName: PropTypes.string.isRequired },
      'test'
    );
    expect(assertPropTypes).toHaveBeenCalled();
  });
  test('assert one parameter example', () => {
    const parameterToCheck = 'ddd';
    expect(() => {
      assertParametersType(
        { parameterToCheck },
        { parameterToCheck: PropTypes.string.isRequired },
        'test one parameter'
      );
    }).not.toThrow();
  });
  test('assert several parameters example', () => {
    const parameterOneToCheck = true;
    const parameterTwoToCheck = { validate: () => {} };
    const propTypes = {
      parameterOneToCheck: PropTypes.bool,
      parameterTwoToCheck: PropTypes.shape({
        validate: PropTypes.func
      })
    };
    expect(() => {
      assertParametersType(
        { parameterOneToCheck, parameterTwoToCheck },
        propTypes,
        'test several parameters'
      );
    }).not.toThrow();
  });
  test('assert by custom type example', () => {
    const parameterShouldBeUpperCase = 'ABC';
    const propTypes = {
      parameterShouldBeUpperCase: function(props, parameterName, callerName) {
        if (!/[A-Z]/.test(props[parameterName])) {
          return new Error(
            `Invalid parameter ${parameterName} supplied to function ${callerName} . Validation failed.`
          );
        }
      }
    };
    expect(() => {
      assertParametersType(
        { parameterShouldBeUpperCase },
        propTypes,
        'test by custom type'
      );
    }).not.toThrow();
  });
});
