import ValidationsManager from '../../validations/src/core/validationsManager';
import ValidateablesManager from '../src/ValidateablesManager';
import ModelMembersManager from '../src/ModelMembersManager';

import { modelMemberGenerator } from '../src/modelMember';
import validateableGenerator from '../src/validateableGenerator';

jest.mock('../src/modelMember', () => ({
  default: require.requireActual('../src/modelMember').default,
  modelMemberGenerator: jest.fn()
}));
jest.mock('../../validations/src/core/validationsManager');
jest.mock('../src/validateableGenerator');
import ComplexTab from './mocksExamples/ComplexTab';
let customTab;
const settings = { validations: [() => true] };
beforeEach(() => {
  ValidationsManager.mockClear();
  modelMemberGenerator.mockClear();
  validateableGenerator.mockClear();
  Object.defineProperty = jest.fn();
  customTab = new ComplexTab();
  customTab.validateables.validate = jest.fn(() => {
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
    test('ValidateablesManager', () => {
      expect(customTab.validateables).toBeInstanceOf(ValidateablesManager);
    });
    test('ModelMembersManager', () => {
      expect(customTab.modelMembers).toBeInstanceOf(ModelMembersManager);
    });
  });
  describe('loop over _propertiesSettings', () => {
    describe('call validateableGenerator for validateables properties', () => {
      test('agreement', () => {
        expect(validateableGenerator.mock.calls[0][0]).toBeDefined();
        expect(validateableGenerator.mock.calls[0][0].name).toBe(
          customTab._propertiesSettings.agreement.name
        );
        expect(validateableGenerator.mock.calls[0][0].descriptor).toEqual(
          customTab._propertiesSettings.agreement.descriptor
        );
        expect(validateableGenerator.mock.calls[0][0].defaultValue).toBe(
          customTab._propertiesSettings.agreement.defaultValue
        );
        expect(validateableGenerator.mock.calls[0][0].validationsManager).toBe(
          customTab._propertiesSettings.agreement.validationsManager
        );
        expect(validateableGenerator.mock.calls[0][0].validateables).toBe(
          customTab.validateables
        );
      });
      test('firstName', () => {
        expect(validateableGenerator.mock.calls[1][0]).toBeDefined();
        expect(validateableGenerator.mock.calls[1][0].name).toBe(
          customTab._propertiesSettings.firstName.name
        );
        expect(validateableGenerator.mock.calls[1][0].descriptor).toEqual(
          customTab._propertiesSettings.firstName.descriptor
        );
        expect(validateableGenerator.mock.calls[1][0].defaultValue).toBe(
          customTab._propertiesSettings.firstName.defaultValue
        );
        expect(validateableGenerator.mock.calls[1][0].validationsManager).toBe(
          customTab._propertiesSettings.firstName.validationsManager
        );
        expect(validateableGenerator.mock.calls[1][0].validateables).toBe(
          customTab.validateables
        );
      });
    });
    describe('call modelMemberGenerator for modelMembers properties', () => {
      test('agreement', () => {
        expect(modelMemberGenerator.mock.calls[0][0]).toBeDefined();
        expect(modelMemberGenerator.mock.calls[0][0].name).toBe('agreement');
        expect(modelMemberGenerator.mock.calls[0][0].descriptor).toBeDefined();
        expect(
          modelMemberGenerator.mock.calls[0][0].modelMembers
        ).toBeDefined();
      });
      test('firstName', () => {
        expect(modelMemberGenerator.mock.calls[1][0]).toBeDefined();
        expect(modelMemberGenerator.mock.calls[1][0].name).toBe('firstName');
        expect(modelMemberGenerator.mock.calls[1][0].descriptor).toBeDefined();
        expect(
          modelMemberGenerator.mock.calls[1][0].modelMembers
        ).toBeDefined();
      });
      test('complex', () => {
        expect(modelMemberGenerator.mock.calls[2][0]).toBeDefined();
        expect(modelMemberGenerator.mock.calls[2][0].name).toBe('complex');
        expect(modelMemberGenerator.mock.calls[2][0].descriptor).toBeDefined();
        expect(
          modelMemberGenerator.mock.calls[2][0].modelMembers
        ).toBeDefined();
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
      customTab.validateables.firstName.validate = jest.fn(
        () => notValidResult
      );
      expect(customTab.validateModel()).toEqual(false);
    });
  });
});
