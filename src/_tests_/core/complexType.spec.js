import ValidationsManager from '../../validations/validationsManager';
import PropertiesManager from '../../core/PropertiesManager';
import * as complexPropertiesRegistration from '../../core/complexPropertiesRegistration';
import ComplexTab from '../mocks/ComplexTab';
import { hebrewName } from '../../validations/languages';
import ComplexType from '../../core/ComplexType';
jest.mock('../../validations/validationsManager');
let customTab;
const settings = { validations: [hebrewName({ message: 'hebrew only' })] };
beforeEach(() => {
  ValidationsManager.mockClear();
  customTab = new ComplexTab();
  complexPropertiesRegistration.initializeProperties = jest.fn();
  customTab.validationsManager.validate = jest.fn(() => {
    return {
      isValid: true,
      message: ''
    };
  });
});
describe('ComplexType', () => {
  describe('define properties:', () => {
    test('validationState', () => {
      expect(customTab.validationState).toBeDefined();
    });
    describe('validationsManager', () => {
      test('is instanceof validationsManagerFactory', () => {
        expect(customTab.validationsManager instanceof ValidationsManager).toBe(
          true
        );
      });
      test('validationsManagerFactory constructor call with settings.validations that passed to ComplexType constructor', () => {
        ValidationsManager.mockClear();
        customTab = new ComplexTab(settings);
        expect(ValidationsManager.mock.calls[0][0]).toBe(settings.validations);
      });
    });
    test('propertiesManager', () => {
      expect(customTab.propertiesManager instanceof PropertiesManager).toBe(
        true
      );
    });
    test('propertiesManager', () => {
      expect(customTab.propertiesManager instanceof PropertiesManager).toBe(
        true
      );
    });
  });
  describe('ComplexType constructor should call initializeProperties', () => {
    beforeEach(() => {
      complexPropertiesRegistration.initializeProperties = jest.fn(() => true);
      customTab = new ComplexTab();
    });
    test('initializeProperties called', () => {
      test('is called from constructor', () => {
        expect(
          complexPropertiesRegistration.initializeProperties
        ).toBeCalledWith(customTab, customTab._properties);
      });
    });
    describe('with params', () => {
      test('complexType', () => {
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[0][0]
        ).toBe(customTab);
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[1][0]
        ).toBe(customTab.complex);
      });
      test('_properties', () => {
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[0][1]
        ).toBe(customTab._properties);
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[1][1]
        ).toBe(customTab.complex._properties);
      });
    });
  });

  describe('registerProperty', () => {
    beforeEach(() => {
      ComplexType.prototype._properties = undefined;
    });
    describe('require params', () => {
      test('descriptor', () => {
        expect(() => {
          ComplexType.prototype.registerProperty({ name: 'mail' });
        }).toThrowError(
          'registerProperty faile: missing require parameter: descriptor or name'
        );
      });
      test('name', () => {
        expect(() => {
          ComplexType.prototype.registerProperty({ descriptor: {} });
        }).toThrowError(
          'registerProperty faile: missing require parameter: descriptor or name'
        );
      });
    });
    test('define _properties array', () => {
      ComplexType.prototype.registerProperty({ name: 'mail', descriptor: {} });
      expect(ComplexType.prototype._properties).toBeDefined();
    });
    test('define object at  _properties[name]', () => {
      ComplexType.prototype.registerProperty({ name: 'mail', descriptor: {} });
      expect(ComplexType.prototype._properties.mail).toBeDefined();
    });
    test('define object with name and decriptor if _properties[name] is undefined', () => {
      ComplexType.prototype.registerProperty({ name: 'mail', descriptor: {} });
      expect(ComplexType.prototype._properties.mail.name).toBe('mail');
      expect(ComplexType.prototype._properties.mail.descriptor).toEqual({});
    });
    test('take the current object if _properties[name] is defined', () => {
      ComplexType.prototype.registerProperty({ name: 'mail', descriptor: {} });
      ComplexType.prototype.registerProperty({ name: 'mail', descriptor: 12 });
      expect(ComplexType.prototype._properties.mail.descriptor).toEqual({});
    });
    test('set all  other params', () => {
      ComplexType.prototype.registerProperty({
        name: 'mail',
        descriptor: {},
        reset: () => {},
        map: () => {}
      });
      expect(ComplexType.prototype._properties.mail.map).toBeDefined();
      expect(ComplexType.prototype._properties.mail.reset).toBeDefined();
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
          customTab.validationsManager.validate = jest.fn(() => {
            return result;
          });
        });
        test('call validationState.setValidationState with result', () => {
          customTab.validate();
          customTab.firstName = '';
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
});
