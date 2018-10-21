import { action, observable } from 'mobx';
import ModularViewModel from 'mobx-vm/modularViewModel';
import ValidationsManager from 'vm-validations/validationsManager';
import ValidateableDefinition from 'mobx-vm/validateableDefinition';
import ModelMemberDefinition from 'mobx-vm/modelMemberDefinition';
import mappingViewModel from 'mobx-vm/mappingViewModel';
// jest.mock('../src/modelMemberDefinition');
// jest.mock('mobx-vm/validateableDefinition');

jest.mock('vm-validations/validationsManager');

let customTab, orginalValidateModel;
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
    },
    users: {
      name: 'users',
      defaultValue: []
    },
    subModular: {
      name: 'subModular'
    }
  },
  validateables: {
    firstName: {
      name: 'firstName',
      validations: [() => true]
    },
    lastName: {
      name: 'lastName',
      validations: [() => true]
    }
  }
};
export class SubModular extends ModularViewModel {
  inSubModular = false;
}
class ModularExample extends ModularViewModel {
  constructor(settings) {
    super(settings);
    this.subModular = new SubModular();
  }
  @observable
  firstName = properties.modelMembers.firstName.defaultValue;
  @observable
  lastName = properties.modelMembers.lastName.defaultValue;
  @observable
  users = properties.modelMembers.users.defaultValue;

  subModular;
  @action.bound
  setFirstName = value => {
    this.firstName = value;
  };
  @action.bound
  setLastName = () => {};

  @action.bound
  addUsers = () => {};
}
let data;
describe('ModularViewModel prototype methods', () => {
  describe('setModelMemberSettings', () => {
    test('settings.name is required', () => {
      expect(() => {
        ModularExample.prototype.setModelMemberSettings();
      }).toThrow();
    });
    test('add properties to _modelMembersSettings', () => {
      ModularExample.prototype.setModelMemberSettings(
        properties.modelMembers.firstName
      );
      expect(ModularExample.prototype._modelMembersSettings.firstName).toBe(
        properties.modelMembers.firstName
      );
      ModularExample.prototype.setModelMemberSettings(
        properties.modelMembers.lastName
      );
      expect(ModularExample.prototype._modelMembersSettings.lastName).toBe(
        properties.modelMembers.lastName
      );
      ModularExample.prototype.setModelMemberSettings(
        properties.modelMembers.users
      );
      expect(ModularExample.prototype._modelMembersSettings.users).toBe(
        properties.modelMembers.users
      );
      ModularExample.prototype.setModelMemberSettings(
        properties.modelMembers.subModular
      );
      expect(ModularExample.prototype._modelMembersSettings.subModular).toBe(
        properties.modelMembers.subModular
      );
    });
  });
  describe('setValidateableSettings', () => {
    test('settings.name is required', () => {
      expect(() => {
        ModularExample.prototype.setValidateableSettings();
      }).toThrow();
    });
    test('add properties to _validateablesSettings', () => {
      ModularExample.prototype.setValidateableSettings(
        properties.validateables.firstName
      );
      expect(ModularExample.prototype._validateablesSettings.firstName).toBe(
        properties.validateables.firstName
      );
      ModularExample.prototype.setValidateableSettings(
        properties.validateables.lastName
      );
      expect(ModularExample.prototype._validateablesSettings.lastName).toBe(
        properties.validateables.lastName
      );
    });
  });

  describe('ModularViewModel constructor', () => {
    beforeAll(() => {
      customTab = new ModularExample(settings);
    });
    describe('define properties:', () => {
      test('validateables', () => {
        expect(customTab.validateables).toBeDefined();
      });
      test('modelMembers', () => {
        expect(customTab.modelMembers).toBeDefined();
      });
      test('map', () => {
        expect(customTab.map).toBeDefined();
      });
      describe('validationsManager', () => {
        test('is instanceof validationsManagerFactory', () => {
          expect(customTab.validationsManager).toBeInstanceOf(
            ValidationsManager
          );
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
        expect(customTab.modelMembers.firstName).toBeInstanceOf(
          ModelMemberDefinition
        );
      });
    });
    describe('generate ValidateableDefinition for each validateables properties', () => {
      test('create definition', () => {
        expect(customTab.validateables.firstName).toBeInstanceOf(
          ValidateableDefinition
        );
      });
      test('apply validate when value change', () => {
        customTab.validateables.firstName.validate = jest.fn();
        customTab.setFirstName('newValue');
        expect(customTab.validateables.firstName.validate).toHaveBeenCalledWith(
          'newValue'
        );
      });
    });
    describe('getAction', () => {
      test('name is required', () => {
        expect(() => {
          customTab.getAction();
        }).toThrow();
      });
      test('return action', () => {
        expect(customTab.getAction('firstName')).toBe(customTab.setFirstName);
      });
    });
    describe('getAddAction', () => {
      test('name is required', () => {
        expect(() => {
          customTab.getAddAction();
        }).toThrow();
      });
      test('return add action', () => {
        expect(customTab.getAddAction('users')).toBe(customTab.addUsers);
      });
    });
    describe('validate', () => {
      beforeAll(() => {
        customTab.validationsManager.validateMultiResults = jest
          .fn()
          .mockReturnValue({
            isValid: false,
            messages: ['message1', 'message2']
          });
        orginalValidateModel = customTab.validateModel;

        customTab.validateModel = jest.fn().mockReturnValue(false);
      });
      test('is async', () => {
        expect(customTab.validate[Symbol.toStringTag]).toEqual('AsyncFunction');
      });
      test('update validationState with failed validation', async () => {
        await customTab.validate();
        expect(customTab.validationState.isValid).toBeFalsy();

        expect(customTab.validationState.messages.toJS()).toEqual([
          'message1',
          'message2'
        ]);
      });
      test('return validation result', async () => {
        expect(await customTab.validate()).toBeFalsy();
      });
    });
    describe('validateModel', () => {
      beforeAll(() => {
        customTab.validateModel = orginalValidateModel;
      });
      test('is async', () => {
        expect(customTab.validateModel[Symbol.toStringTag]).toEqual(
          'AsyncFunction'
        );
      });
      test('call validate for all modelMembers properties', async () => {
        customTab.validateables.firstName.validate = jest.fn();
        customTab.validateables.lastName.validate = jest.fn();
        await customTab.validateModel();
        expect(customTab.validateables.firstName.validate).toHaveBeenCalled();
        expect(customTab.validateables.lastName.validate).toHaveBeenCalled();
      });
      test('call  modularViewModel.validate for sub modular', async () => {
        customTab.subModular.validate = jest.fn();
        await customTab.validateModel();
        expect(customTab.subModular.validate).toHaveBeenCalled();
      });
      test('return validation result', async () => {
        expect(await customTab.validateModel()).toBeFalsy();
      });
    });
    describe('fromJSON', () => {
      beforeAll(() => {
        mappingViewModel.fromJSON = jest.fn();
        data = {};
      });
      test('data param is required', () => {
        expect(customTab.fromJSON()).toThrow();
      });
      test('call mappingViewModel.fromJSON', () => {
        customTab.fromJSON(data);
        expect(mappingViewModel.fromJSON).toHaveBeenCalled();
      });
      test('call mappingViewModel.fromJSON with data, modelMember and mappingType', () => {
        const mappingType = 'serverMap';
        customTab.fromJSON(data, mappingType);
        expect(mappingViewModel.fromJSON).toHaveBeenCalledWith(
          data,
          customTab,
          mappingType
        );
      });
    });
    describe('toJSON', () => {
      beforeAll(() => {
        data = {
          firstName: 'aaa',
          lastName: 'bbb'
        };
        mappingViewModel.toJSON = jest.fn().mockReturnValue(data);
      });
      test('call mappingViewModel.toJSON', () => {
        customTab.toJSON();
        expect(mappingViewModel.toJSON).toHaveBeenCalled();
      });
      test('call mappingViewModel.toJSON with modelMember and mappingType', () => {
        const mappingType = 'serverMap';
        customTab.toJSON(mappingType);
        expect(mappingViewModel.toJSON).toHaveBeenCalledWith(
          customTab,
          mappingType
        );
      });
      test('return json data', () => {
        const jsonData = customTab.toJSON();
        expect(jsonData).toEqual(data);
      });
    });
  });
});
