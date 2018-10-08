import ModularViewModel from 'mobx-vm/modularViewModel';
import ValidationsManager from 'vm-validations/validationsManager';
import ValidateableDefinition from 'mobx-vm/validateableDefinition';
import ModelMemberDefinition from '../src/modelMemberDefinition';
jest.mock('../src/modelMemberDefinition');
jest.mock('mobx-vm/validateableDefinition');

jest.mock('vm-validations/validationsManager');

class ModularExample extends ModularViewModel {}
let customTab;
const settings = { validations: [() => true] };
const properties = {
  modelMembers: {
    firstName: {
      name: 'firstName',
      defaultValue: 'fff',
      reset: () => true
    },
    lastName: {
      name: 'lastName',
      defaultValue: 'ddd'
    }
  },
  validateables: {
    firstName: {
      name: 'firstName',
      validations: [() => true]
    }
  }
};

describe('ModularViewModel constructor', () => {
  beforeAll(() => {
    customTab = new ModularExample(settings);
  });
  describe('prototype methods', () => {
    describe('setModelMemberSettings', () => {
      test('settings.name is required', () => {
        expect(() => {
          customTab.setModelMemberSettings();
        }).toThrow();
      });
      test('add properties to _modelMembersSettings', () => {
        customTab.setModelMemberSettings(properties.modelMembers.firstName);
        expect(customTab._modelMembersSettings.firstName).toBe(
          properties.modelMembers.firstName
        );
        customTab.setModelMemberSettings(properties.modelMembers.lastName);
        expect(customTab._modelMembersSettings.lastName).toBe(
          properties.modelMembers.lastName
        );
      });
    });
    describe('setValidateableSettings', () => {
      test('settings.name is required', () => {
        expect(() => {
          customTab.setValidateableSettings();
        }).toThrow();
      });
      test('add properties to _modelMembersSettings', () => {
        customTab.setValidateableSettings(properties.validateables.firstName);
        expect(customTab._validateablesSettings.firstName).toBe(
          properties.validateables.firstName
        );
      });
    });
  });

  describe('define properties:', () => {
    test('validateables', () => {
      expect(customTab.validateables).toBeDefined();
    });
    test('modelMembers', () => {
      expect(customTab.modelMembers).toBeDefined();
    });
    describe('validationsManager', () => {
      test('is instanceof validationsManagerFactory', () => {
        expect(customTab.validationsManager).toBeInstanceOf(ValidationsManager);
      });
      test('constructor call with settings.validations that passed to ModularViewModel constructor', () => {
        expect(customTab.validationsManager.validations).toEqual(
          settings.validations
        );
      });
    });
    test('validationState', () => {
      expect(customTab.validationState).toBeDefined();
    });
  });
  describe('generate ModelMemberDefinition for each modelMembers properties', () => {
    test('create definition', () => {
      // expect(ModelMemberDefinition).toHaveBeenCalledWith(
      //   properties.modelMembers.firstName
      // );
      expect(customTab.modelMembers.firstName).toBeInstanceOf(
        ModelMemberDefinition
      );
    });
  });
  describe('generate ValidateableDefinition for each validateables properties', () => {
    test('create definition', () => {
      // expect(ValidateableDefinition).toHaveBeenCalledWith(
      //   properties.validateables.firstName
      // );
      expect(customTab.validateables.firstName).toBeInstanceOf(
        ValidateableDefinition
      );
    });
    test('apply validate when value change', () => {//here});
  });
  // describe('call validateableGenerator for validateables properties', () => {
  //   test('agreement', () => {
  //     expect(validateableGenerator.mock.calls[0][0]).toBeDefined();
  //     expect(validateableGenerator.mock.calls[0][0].name).toBe(
  //       customTab._propertiesSettings.agreement.name
  //     );
  //     expect(validateableGenerator.mock.calls[0][0].descriptor).toEqual(
  //       customTab._propertiesSettings.agreement.descriptor
  //     );
  //     expect(validateableGenerator.mock.calls[0][0].defaultValue).toBe(
  //       customTab._propertiesSettings.agreement.defaultValue
  //     );
  //     expect(validateableGenerator.mock.calls[0][0].validationsManager).toBe(
  //       customTab._propertiesSettings.agreement.validationsManager
  //     );
  //     expect(validateableGenerator.mock.calls[0][0].validateables).toBe(
  //       customTab.validateables
  //     );
  //   });
  //   test('firstName', () => {
  //     expect(validateableGenerator.mock.calls[1][0]).toBeDefined();
  //     expect(validateableGenerator.mock.calls[1][0].name).toBe(
  //       customTab._propertiesSettings.firstName.name
  //     );
  //     expect(validateableGenerator.mock.calls[1][0].descriptor).toEqual(
  //       customTab._propertiesSettings.firstName.descriptor
  //     );
  //     expect(validateableGenerator.mock.calls[1][0].defaultValue).toBe(
  //       customTab._propertiesSettings.firstName.defaultValue
  //     );
  //     expect(validateableGenerator.mock.calls[1][0].validationsManager).toBe(
  //       customTab._propertiesSettings.firstName.validationsManager
  //     );
  //     expect(validateableGenerator.mock.calls[1][0].validateables).toBe(
  //       customTab.validateables
  //     );
  //   });
  // });
});

// describe('setPropertySettings', () => {
//   beforeEach(() => {
//     ModularExample.prototype._propertiesSettings = undefined;
//   });
//   test('is defined at class potoytpe', () => {
//     expect(ModularExample.prototype.setPropertySettings).toBeDefined();
//   });
//   test('params - should get object with name', () => {
//     expect(() => {
//       ModularExample.prototype.setPropertySettings({});
//     }).toThrow();
//     expect(() => {
//       ModularExample.prototype.setPropertySettings({ name: 'firstName' });
//     }).not.toThrow();
//   });
//   test('set params in _propertiesSettings ', () => {
//     const params = { name: 'firstName', descriptor: {} };
//     ModularExample.prototype.setPropertySettings(params);
//     expect(
//       ModularExample.prototype._propertiesSettings.firstName.descriptor
//     ).toEqual({});
//     expect(ModularExample.prototype._propertiesSettings.firstName.name).toBe(
//       'firstName'
//     );
//   });
//   test('add current params to the exist settings of property', () => {
//     const params = { name: 'firstName', descriptor: {} };
//     const newParams = { name: 'firstName', validationsManager: {} };
//     ModularExample.prototype.setPropertySettings(params);
//     ModularExample.prototype.setPropertySettings(newParams);
//     expect(
//       ModularExample.prototype._propertiesSettings.firstName.descriptor
//     ).toEqual({});
//     expect(ModularExample.prototype._propertiesSettings.firstName.name).toBe(
//       'firstName'
//     );
//     expect(
//       ModularExample.prototype._propertiesSettings.firstName.validationsManager
//     ).toEqual({});
//   });
//   describe('validate', () => {
//     const notValidResult = {
//       message: 'not valid',
//       isValid: false
//     };
//     const propertiesResult = true;
//     beforeEach(() => {
//       customTab = new ModularExample();
//       jest.spyOn(customTab.validationState, 'setValidationState');
//       customTab.validationsManager.validate = jest.fn(() => notValidResult);
//       jest.spyOn(customTab.validationState, 'setIsValid');
//       customTab.validateModel = jest.fn(() => propertiesResult);
//     });

//     test('call validationState.setValidationState with result', () => {
//       customTab.validate();
//       expect(customTab.validationState.setValidationState).toBeCalledWith(
//         notValidResult
//       );
//     });
//     test('call validationState.setIsValid with manipulation of result and properties result', () => {
//       customTab.validate();
//       expect(customTab.validationState.setIsValid).toBeCalledWith(false);
//     });
//     test('return validationState.isValid', () => {
//       expect(customTab.validate()).toEqual(false);
//     });
//   });
//   describe('validateModel', () => {
//     test('all properties valid - return true', () => {
//       customTab = new ModularExample();
//       expect(customTab.validateModel()).toEqual(true);
//     });
//     test('one properties not valid - return false', () => {
//       const notValidResult = false;
//       customTab = new ModularExample();
//       customTab.validateables.firstName.validate = jest.fn(
//         () => notValidResult
//       );
//       expect(customTab.validateModel()).toEqual(false);
//     });
//   });
// });
