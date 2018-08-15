import ValidationsManager from '../../validations/src/core/validationsManager';
import FormObservablesManager from '../src/FormObservablesManager';
import ModelPropsManager from '../src/ModelPropsManager';

import { modelPropGenerator } from '../src/modelProp';
import formObservableGenerator from '../src/formObservableGenerator';

jest.mock('../src/modelProp', () => ({
  default: require.requireActual('../src/modelProp').default,
  modelPropGenerator: jest.fn()
}));
jest.mock('../../validations/src/core/validationsManager');
jest.mock('../src/formObservableGenerator');
import ComplexType from 'core/ComplexType';
import ComplexTab from './mocksExamples/ComplexTab';
let customTab;
const settings = { validations: [() => true] };
beforeEach(() => {
  ValidationsManager.mockClear();
  modelPropGenerator.mockClear();
  formObservableGenerator.mockClear();
  Object.defineProperty = jest.fn();
  customTab = new ComplexTab();
  customTab.formObservablesProperties.validate = jest.fn(() => {
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
      expect(customTab.formObservablesProperties).toBeInstanceOf(FormObservablesManager);
    });
    test('ModelPropsManager', () => {
      expect(customTab.modelPropsProperties).toBeInstanceOf(ModelPropsManager);
    });
  });
  describe('loop over _propertiesSettings', () => {
    describe('call formObservableGenerator for formObservablesProperties properties', () => {
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
        expect(formObservableGenerator.mock.calls[0][0].formObservablesProperties).toBe(
          customTab.formObservablesProperties
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
        expect(formObservableGenerator.mock.calls[1][0].formObservablesProperties).toBe(
          customTab.formObservablesProperties
        );
      });
    });
    describe('call modelPropGenerator for modelPropsProperties properties', () => {
      test('agreement', () => {
        expect(modelPropGenerator.mock.calls[0][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[0][0].name).toBe('agreement');
        expect(modelPropGenerator.mock.calls[0][0].descriptor).toBeDefined();
        expect(modelPropGenerator.mock.calls[0][0].modelPropsProperties).toBeDefined();
      });
      test('firstName', () => {
        expect(modelPropGenerator.mock.calls[1][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[1][0].name).toBe('firstName');
        expect(modelPropGenerator.mock.calls[1][0].descriptor).toBeDefined();
        expect(modelPropGenerator.mock.calls[1][0].modelPropsProperties).toBeDefined();
      });
      test('complex', () => {
        expect(modelPropGenerator.mock.calls[2][0]).toBeDefined();
        expect(modelPropGenerator.mock.calls[2][0].name).toBe('complex');
        expect(modelPropGenerator.mock.calls[2][0].descriptor).toBeDefined();
        expect(modelPropGenerator.mock.calls[2][0].modelPropsProperties).toBeDefined();
      });
    });
  });
});

describe('initializeComplexProperties', () => {
  beforeEach(() => {
    customTab = new ComplexTab();
    customTab.modelPropsProperties.setComplexProperty = jest.fn();
    customTab.initializeComplexProperties();
  });

  describe('call setComplexProperty for every complex property', () => {
    test('only with all complex properties', () => {
      expect(customTab.modelPropsProperties.setComplexProperty.mock.calls.length).toBe(1);
    });
    test('params: propty name', () => {
      expect(customTab.modelPropsProperties.setComplexProperty.mock.calls[0][0]).toBe(
        'complex'
      );
    });
    test('params: object with ref -', () => {
      expect(customTab.modelPropsProperties.setComplexProperty.mock.calls[0][1]).toEqual({
        ref: customTab.complex
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
  describe('validate', () => {
    const notValidResult = {
      message: 'not valid',
      isValid: false
    };
    const propertiesResult = true;
    beforeEach(() => {
      customTab = new ComplexTab();
      jest.spyOn(customTab.validationState, 'setValidationState');
      customTab.validationsManager.validate = jest.fn(() => notValidResult);
      jest.spyOn(customTab.validationState, 'setIsValid');
      customTab.validateModel = jest.fn(() => propertiesResult);
    });

    test('call validationState.setValidationState with result', () => {
      customTab.validate();
      expect(customTab.validationState.setValidationState).toBeCalledWith(
        notValidResult
      );
    });
    test('call validationState.setIsValid with manipulation of result and properties result', () => {
      customTab.validate();
      expect(customTab.validationState.setIsValid).toBeCalledWith(false);
    });
    test('return validationState.isValid', () => {
      expect(customTab.validate()).toEqual(false);
    });
  });
  describe('validateModel', () => {
    test('all properties valid - return true', () => {
      customTab = new ComplexTab();
      expect(customTab.validateModel()).toEqual(true);
    });
    test('one properties not valid - return false', () => {
      const notValidResult = false;
      customTab = new ComplexTab();
      customTab.formObservablesProperties.firstName.validate = jest.fn(
        () => notValidResult
      );
      expect(customTab.validateModel()).toEqual(false);
    });
  });
});
