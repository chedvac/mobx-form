import ValidationsManager from '../../../validations/src/core/validationsManager';
import FormObservablesManager from '../src/propertiesManager/FormObservablesManager';
import ModelPropsManager from '../src/propertiesManager/ModelPropsManager';

import { modelPropGenerator } from '../src/modelProp';
import formObservableGenerator from '../src/formObservableGenerator';

jest.mock('../src/modelProp', () => ({
  default: require.requireActual('../src/modelProp').default,
  modelPropGenerator: jest.fn()
}));
jest.mock('../../../validations/src/core/validationsManager');
jest.mock('../src/formObservableGenerator');
import ComplexTab from './mocksExamples/ComplexTab';
import ComplexType from 'core/ComplexType';
let customTab;
const settings = { validations: [() => true] };
beforeEach(() => {
  ValidationsManager.mockClear();
  modelPropGenerator.mockClear();
  formObservableGenerator.mockClear();
  Object.defineProperty = jest.fn();
  customTab = new ComplexTab();
  customTab.formObservablesManager.validate = jest.fn(() => {
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
    test('FormObservablesManager', () => {
      expect(customTab.formObservablesManager).toBeInstanceOf(
        FormObservablesManager
      );
    });
    test('ModelPropsManager', () => {
      expect(customTab.modelPropsManager).toBeInstanceOf(ModelPropsManager);
    });
  });
  describe('loop over _propertiesSettings', () => {
    describe('call formObservableGenerator for formObservables properties', () => {
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
        expect(
          formObservableGenerator.mock.calls[0][0].formObservablesManager
        ).toBe(customTab.formObservablesManager);
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
        expect(
          formObservableGenerator.mock.calls[1][0].formObservablesManager
        ).toBe(customTab.formObservablesManager);
      });
    });
    describe('call modelPropGenerator for modelProps properties', () => {
      test('agreement', () => {
        expect(modelPropGenerator.mock.calls[0][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[0][0].name).toBe('agreement');
        expect(modelPropGenerator.mock.calls[0][0].descriptor).toBeDefined();
        expect(
          modelPropGenerator.mock.calls[0][0].modelPropsManager
        ).toBeDefined();
      });
      test('firstName', () => {
        expect(modelPropGenerator.mock.calls[1][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[1][0].name).toBe('firstName');
        expect(modelPropGenerator.mock.calls[1][0].descriptor).toBeDefined();
        expect(
          modelPropGenerator.mock.calls[1][0].modelPropsManager
        ).toBeDefined();
      });
      test('complex', () => {
        expect(modelPropGenerator.mock.calls[2][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[2][0].name).toBe('complex');
        expect(modelPropGenerator.mock.calls[2][0].descriptor).toBeDefined();
        expect(
          modelPropGenerator.mock.calls[2][0].modelPropsManager
        ).toBeDefined();
      });
    });
  });
});

describe('initializeComplexProperties', () => {
  beforeEach(() => {
    customTab = new ComplexTab();
    customTab.modelPropsManager.setComplexProperty = jest.fn();
    customTab.initializeComplexProperties();
  });

  describe('call setComplexProperty for every complex property', () => {
    test('only with all complex properties', () => {
      expect(
        customTab.modelPropsManager.setComplexProperty.mock.calls.length
      ).toBe(1);
    });
    test('params: propty name', () => {
      expect(
        customTab.modelPropsManager.setComplexProperty.mock.calls[0][0]
      ).toBe('complex');
    });
    test('params: object with ref -', () => {
      expect(
        customTab.modelPropsManager.setComplexProperty.mock.calls[0][1]
      ).toEqual({ ref: customTab.complex });
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
        Object.entries(customTab.modelPropsManager.getProperties()).forEach(
          ([name, property]) => {
            if (!(property instanceof ComplexType)) {
              customTab.property.setValidate(jest.fn(() => result));
            }
          }
        );
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
        customTab.formObservablesManager.getProperties().values(property => {
          property.validate = jest.fn(() => result);
        });
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
        customTab.formObservablesManager.getProperties().values(property => {
          property.validate = jest.fn(() => {
            return {
              message: '',
              isValid: true
            };
          });
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
        expect(customTab.formObservablesManager.validate).toBeCalledWith({
          parent: customTab
        });
        expect(customTab.validationState.setIsValid).toBeCalledWith(false);
      });
    });
    describe('sucsses ', () => {
      beforeEach(() => {
        customTab = new ComplexTab();
        customTab.formObservablesManager.getProperties().values(property => {
          property.validate = jest.fn(() => {
            {
              return {
                message: '',
                isValid: true
              };
            }
          });
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
        expect(customTab.formObservablesManager.validate).toBeCalledWith({
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
  test('is defined at class potoytpe', () => {
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
