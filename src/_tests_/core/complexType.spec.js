import ValidationsManager from '../../validations/src/core/validationsManager';
import PropertiesManager from 'core/PropertiesManager';
import formObservableGenerator from '../../core/formObservableGenerator';
import { modelPropGenerator } from '../../core/modelProp';
jest.mock('../../core/modelProp', () => ({
  default: require.requireActual('../../core/modelProp').default,
  modelPropGenerator: jest.fn()
}));
jest.mock('../../core/formObservableGenerator');
jest.mock('../../validations/src/core/validationsManager');

import ComplexTab from '../mocks/ComplexTab';

let customTab;
const settings = { validations: [() => true] };
beforeEach(() => {
  ValidationsManager.mockClear();
  formObservableGenerator.mockClear();
  modelPropGenerator.mockClear();
  customTab = new ComplexTab();
  customTab.propertiesManager.validate = jest.fn(() => {
    return {
      isValid: true,
      message: ''
    };
  });
  customTab.validationsManager.validate = jest.fn(() => {
    return {
      isValid: true,
      message: ''
    };
  });
});
describe('ComplexType constructor', () => {
  describe('define properties:', () => {
    test('validationState', () => {
      expect(customTab.validationState).toBeDefined();
    });
    describe('validationsManager', () => {
      test('is instanceof validationsManagerFactory', () => {
        expect(customTab.validationsManager).toBeInstanceOf(ValidationsManager);
      });
      test('constructor call with settings.validations that passed to ComplexType constructor', () => {
        customTab = new ComplexTab(settings);
        expect(ValidationsManager.mock.instances[0][0]).toBe(
          settings.validations
        );
      });
    });
    test('propertiesManager', () => {
      expect(customTab.propertiesManager).toBeInstanceOf(PropertiesManager);
    });
  });

  describe('setPropertiesReferences ', () => {
    beforeEach(() => {
      customTab.propertiesManager.getPropertiesDescriptors = jest
        .fn()
        .mockReturnValue({ firstName: { value: 1 }, agreement: { value: 2 } });
    });
    test('call propertiesManager.getPropertiesDescriptors', () => {
      customTab.setPropertiesReferences();
      expect(
        customTab.propertiesManager.getPropertiesDescriptors.mock.calls.length
      ).toBe(1);
    });
    test('set the value from getPropertiesDescriptors in the complex by key', () => {
      expect(ComplexTab.prototype.firstName).toEqual({});
      customTab.setPropertiesReferences();

      expect(customTab.firstName).toEqual({ value: 1 });
    });
  });
  describe('loop over _propertiesSettings', () => {
    describe('call generateModelProp for modelProps properties', () => {
      test('agreement', () => {
        expect(formObservableGenerator.mock.calls[0][0]).toBeDefined();
        expect(formObservableGenerator.mock.calls[0][0].name).toBe(
          customTab._propertiesSettings.agreement.name
        );
        expect(formObservableGenerator.mock.calls[0][0].descriptor).toEqual(
          customTab._propertiesSettings.agreement.descriptor
        );
        expect(formObservableGenerator.mock.calls[0][0].defaultValue).toBe(
          customTab._propertiesSettings.agreement.defaultValue
        );
        expect(
          formObservableGenerator.mock.calls[0][0].validationsManager
        ).toBe(customTab._propertiesSettings.agreement.validationsManager);
        expect(formObservableGenerator.mock.calls[0][0].propertiesManager).toBe(
          customTab.propertiesManager
        );
      });
      test('firstName', () => {
        expect(formObservableGenerator.mock.calls[1][0]).toBeDefined();
        expect(formObservableGenerator.mock.calls[1][0].name).toBe(
          customTab._propertiesSettings.firstName.name
        );
        expect(formObservableGenerator.mock.calls[1][0].descriptor).toEqual(
          customTab._propertiesSettings.firstName.descriptor
        );
        expect(formObservableGenerator.mock.calls[1][0].defaultValue).toBe(
          customTab._propertiesSettings.firstName.defaultValue
        );
        expect(
          formObservableGenerator.mock.calls[1][0].validationsManager
        ).toBe(customTab._propertiesSettings.firstName.validationsManager);
        expect(formObservableGenerator.mock.calls[1][0].propertiesManager).toBe(
          customTab.propertiesManager
        );
      });
    });
    describe('call modelPropGenerator for modelProps properties', () => {
      test('agreement', () => {
        expect(modelPropGenerator.mock.calls[0][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[0][0].name).toBe('agreement');
        expect(modelPropGenerator.mock.calls[0][0].descriptor).toBeDefined();
        expect(
          modelPropGenerator.mock.calls[0][0].propertiesManager
        ).toBeDefined();
      });
      test('firstName', () => {
        expect(modelPropGenerator.mock.calls[1][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[1][0].name).toBe('firstName');
        expect(modelPropGenerator.mock.calls[1][0].descriptor).toBeDefined();
        expect(
          modelPropGenerator.mock.calls[1][0].propertiesManager
        ).toBeDefined();
      });
      test('complex', () => {
        expect(modelPropGenerator.mock.calls[2][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[2][0].name).toBe('complex');
        expect(modelPropGenerator.mock.calls[2][0].descriptor).toBeDefined();
        expect(
          modelPropGenerator.mock.calls[2][0].propertiesManager
        ).toBeDefined();
      });
    });
  });
});

describe('initializeComplexProperties', () => {
  beforeEach(() => {
    customTab = new ComplexTab();
    customTab.propertiesManager.setComplexProperty = jest.fn();
    customTab.initializeComplexProperties();
  });

  describe('call setComplexProperty for every complex property', () => {
    test('only with all complex properties', () => {
      expect(
        customTab.propertiesManager.setComplexProperty.mock.calls.length
      ).toBe(1);
    });
    test('params: propty name', () => {
      expect(
        customTab.propertiesManager.setComplexProperty.mock.calls[0][0]
      ).toBe('complex');
    });
    test('params: object with propety validate function', () => {
      expect(
        customTab.propertiesManager.setComplexProperty.mock.calls[0][1]
      ).toEqual({ validate: customTab.complex.validate });
    });
  });
});
describe('validate - validate itself and all childs', () => {
  beforeEach(() => {
    customTab = new ComplexTab();
    customTab.validationState.setValidationState = jest.fn();
  });
  describe('validate itself', () => {
    describe('call validations fail ', () => {
      const result = {
        message: 'not valid',
        isValid: false
      };
      beforeEach(() => {
        customTab.validationsManager.validate = jest.fn(() => result);
        customTab.propertiesManager.validate = jest.fn(() => result);
      });
      test('call validationState.setValidationState with result', () => {
        customTab.validate();
        expect(
          customTab.validationState.setValidationState.mock.calls[0][0]
        ).toEqual(result);
      });
    });
    describe('call validations sucsses ', () => {
      const result = {
        message: '',
        isValid: true
      };
      beforeEach(() => {
        customTab.validationsManager.validate = jest.fn(() => {
          return result;
        });
        customTab.propertiesManager.validate = jest.fn(() => result);
      });
      test('call validationState.setValidationState with result', () => {
        customTab.validate();
        expect(
          customTab.validationState.setValidationState.mock.calls[0][0]
        ).toEqual(result);
      });
    });
  });
  describe('validate children ', () => {
    describe('failed', () => {
      beforeEach(() => {
        customTab = new ComplexTab();
        customTab.propertiesManager.validate = jest.fn(() => {
          return {
            message: '',
            isValid: true
          };
        });
        customTab.validationsManager.validate = jest.fn(() => {
          return {
            isValid: false
          };
        });
        customTab.validationState.setIsValid = jest.fn();
      });
      test('validations fail - ', () => {
        customTab.validate();
        expect(customTab.propertiesManager.validate).toBeCalledWith({
          parent: customTab
        });
        expect(customTab.validationState.setIsValid).toBeCalledWith(false);
      });
    });
    describe('sucsses ', () => {
      beforeEach(() => {
        customTab = new ComplexTab();
        customTab.propertiesManager.validate = jest.fn(() => {
          return {
            message: '',
            isValid: true
          };
        });
        customTab.validationsManager.validate = jest.fn(() => {
          return {
            isValid: true
          };
        });
        customTab.validationState.setIsValid = jest.fn();
      });
      test('sucsses', () => {
        customTab.validate();
        expect(customTab.propertiesManager.validate).toBeCalledWith({
          parent: customTab
        });
        expect(customTab.validationState.setIsValid).toBeCalledWith(true);
      });
    });
  });
});
describe('setPropertySettings', () => {
  beforeEach(() => {
    ComplexTab.prototype._propertiesSettings = undefined;
  });
  test('setPropertySettings is defined at class potoytpe', () => {
    expect(ComplexTab.prototype.setPropertySettings).toBeDefined();
  });
  test('params - should get object with name', () => {
    expect(() => {
      ComplexTab.prototype.setPropertySettings({});
    }).toThrow();
    expect(() => {
      ComplexTab.prototype.setPropertySettings({ name: 'firstName' });
    }).not.toThrow();
  });
  test('set params in _propertiesSettings ', () => {
    const params = { name: 'firstName', descriptor: {} };
    ComplexTab.prototype.setPropertySettings(params);
    expect(
      ComplexTab.prototype._propertiesSettings.firstName.descriptor
    ).toEqual({});
    expect(ComplexTab.prototype._propertiesSettings.firstName.name).toBe(
      'firstName'
    );
  });
  test('add current params to the exist settings of property', () => {
    const params = { name: 'firstName', descriptor: {} };
    const newParams = { name: 'firstName', validationsManager: {} };
    ComplexTab.prototype.setPropertySettings(params);
    ComplexTab.prototype.setPropertySettings(newParams);
    expect(
      ComplexTab.prototype._propertiesSettings.firstName.descriptor
    ).toEqual({});
    expect(ComplexTab.prototype._propertiesSettings.firstName.name).toBe(
      'firstName'
    );
    expect(
      ComplexTab.prototype._propertiesSettings.firstName.validationsManager
    ).toEqual({});
  });
});
