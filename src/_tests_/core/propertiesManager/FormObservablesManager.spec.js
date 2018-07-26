import FormObservablesManager from 'core/propertiesManager/FormObservablesManager';
import PropertiesManager from 'core/propertiesManager/PropertiesManager';
import validationsManagerFactory from 'validations/core/validationsManager';
import FormObservableBehavior from 'core/propertiesManager/FormObservableBehavior';

let formObservablesManager1;
beforeEach(() => {
  formObservablesManager1 = new FormObservablesManager();
});
describe('FormObservablesManager', () => {
  test('createProperty function exist', () => {
    expect(typeof formObservablesManager1.createProperty).toBe('function');
  });
  test('setFormObservableProperty function exist', () => {
    expect(typeof formObservablesManager1.setFormObservableProperty).toBe(
      'function'
    );
  });
  describe('createProperty -', () => {
    test('call to super createProperty with new FormObservableBehavior instance', () => {
      const superCreateProperty = jest.spyOn(formObservablesManager1.__proto__.__proto__, 'createProperty');
      formObservablesManager1.createProperty('firstName');
      expect(superCreateProperty).toHaveBeenCalledWith('firstName', expect.any(FormObservableBehavior));
      superCreateProperty.mockRestore();
    });
  });
  describe('setFormObservableProperty -', () => {
    let mockFn;
    let validationsManager;
    beforeEach(() => {
      formObservablesManager1.createProperty('firstName');
      mockFn = jest.fn();
      validationsManager = new validationsManagerFactory();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty({});
      }).toThrow();
    });
    test('settings.validationsManager is required', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty('firstName', {
          validationsManager: validationsManager
        });
      }).not.toThrow();
    });
    test('settings should be object', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty('firstName', 'str');
      }).toThrow();
    });
    test('settings.validate should be function', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty('firstName', {
          validate: {},
          ref: {},
          descriptor: {},
          validationsManager: validationsManager
        });
      }).toThrow();
    });
    test('settings.ref should be object', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty('firstName', {
          validate: mockFn,
          ref: 'str',
          descriptor: {},
          validationsManager: validationsManager
        });
      }).toThrow();
    });
    test('settings.descriptor should be object', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty('firstName', {
          validate: mockFn,
          ref: {},
          descriptor: 'str',
          validationsManager: validationsManager
        });
      }).toThrow();
    });
    test('settings.validationsManager should be instanceOf ValidationsManager', () => {
      expect(() => {
        formObservablesManager1.setFormObservableProperty('firstName', {
          validate: mockFn,
          ref: {},
          descriptor: {},
          validationsManager: 'str'
        });
      }).toThrow();
    });
    test('apply property setRef, setValidationsManager, setValidate,setDescriptor methods', () => {
      formObservablesManager1.getProperty('firstName').setRef = jest.fn();
      formObservablesManager1.getProperty(
        'firstName'
      ).setValidationsManager = jest.fn();
      formObservablesManager1.getProperty('firstName').setValidate = jest.fn();
      formObservablesManager1.getProperty(
        'firstName'
      ).setDescriptor = jest.fn();
      formObservablesManager1.setFormObservableProperty('firstName', {
        validationsManager: validationsManager
      });
      expect(
        formObservablesManager1.getProperty('firstName').setRef
      ).toBeCalled();
      expect(
        formObservablesManager1.getProperty('firstName').setValidationsManager
      ).toBeCalled();
      expect(
        formObservablesManager1.getProperty('firstName').setValidate
      ).toBeCalled();
      expect(
        formObservablesManager1.getProperty('firstName').setDescriptor
      ).toBeCalled();
    });
    test('send the received settings to property methods', () => {
      const mockFn = jest.fn();
      formObservablesManager1.getProperty('firstName').setRef = jest.fn();
      formObservablesManager1.getProperty(
        'firstName'
      ).setValidationsManager = jest.fn();
      formObservablesManager1.getProperty('firstName').setValidate = jest.fn();
      formObservablesManager1.getProperty(
        'firstName'
      ).setDescriptor = jest.fn();

      formObservablesManager1.setFormObservableProperty('firstName', {
        validate: mockFn,
        ref: {},
        descriptor: {},
        validationsManager: validationsManager
      });
      expect(
        formObservablesManager1.getProperty('firstName').setDescriptor
      ).toBeCalledWith({});
      expect(
        formObservablesManager1.getProperty('firstName').setRef
      ).toBeCalledWith({});
      expect(
        formObservablesManager1.getProperty('firstName').setValidationsManager
      ).toBeCalledWith(validationsManager);
      expect(
        formObservablesManager1.getProperty('firstName').setValidate
      ).toBeCalledWith(mockFn);
    });
  });
});
