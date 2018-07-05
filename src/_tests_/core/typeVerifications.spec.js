import assertParametersType from '../../core/typeVerifications';
import { assertPropTypes } from 'check-prop-types';


describe('PropertiesManager', () => {
    beforeEach(() => {
        assertPropTypes.();
    });
  test('properties object', () => {
    expect(propertiesManager1.properties).toBeDefined();
  });
  test('applyChildAction function exist', () => {
    expect(typeof propertiesManager1.applyChildAction).toBe('function');
  });
  test('setComplexProperty function exist', () => {
    expect(typeof propertiesManager1.setComplexProperty).toBe('function');
  });
  test('validate function exist', () => {
    expect(typeof propertiesManager1.validate).toBe('function');
  });
  test('setFormObservableProperty function exist', () => {
    expect(typeof propertiesManager1.setFormObservableProperty).toBe(
      'function'
    );
  });
});