import formObservableGenerator from '../../core/formObservableGenerator';
jest.mock('../../core/formObservableGenerator');
import * as modelPropFunctions from '../../core/modelProp';
import complexInitilize, { descriptor } from '../mocks/complexType';

let complextTab;
import { initializeProperties } from '../../core/complexPropertiesRegistration';

describe('initializeProperties', () => {
  beforeEach(() => {
    // let map;
    modelPropFunctions.modelPropGenerator = jest.fn();
    complextTab = complexInitilize;
    initializeProperties(complextTab);
  });
  describe('is once', () => {
    test('initializeProperties change _propertiesInitialized to true', () => {
      expect(complextTab._propertiesInitialized).toBeTruthy();
    });
    test('initializeProperties not generate properties if _propertiesInitialized is already true', () => {
      initializeProperties(complextTab);
      expect(formObservableGenerator.mock.calls.length).toBe(0);
      expect(modelPropFunctions.modelPropGenerator.mock.calls.length).toBe(0);
    });
  });
  describe('generate properties', () => {
    beforeEach(() => {
      complextTab._propertiesInitialized = false;
      initializeProperties(complextTab, complextTab._properties);
    });
    test('generate formObservable properties', () => {
      expect(formObservableGenerator.mock.calls.length).toBe(2);
      expect(formObservableGenerator.mock.calls[0][0]).toEqual({
        target: complextTab,
        name: 'firstName',
        descriptor,
        validationsManager: {}
      });
      expect(formObservableGenerator.mock.calls[1][0]).toEqual({
        target: complextTab,
        name: 'address',
        descriptor,
        validationsManager: {}
      });
    });
    test('generate modelProp properties', () => {
      expect(modelPropFunctions.modelPropGenerator.mock.calls.length).toBe(2);
      expect(modelPropFunctions.modelPropGenerator.mock.calls[0][0]).toEqual({
        target: complextTab,
        name: 'lastName',
        descriptor,
        validationsManager: {}
      });
      expect(modelPropFunctions.modelPropGenerator.mock.calls[1][0]).toEqual({
        target: complextTab,
        name: 'address',
        descriptor,
        validationsManager: {}
      });
    });
  });
});
