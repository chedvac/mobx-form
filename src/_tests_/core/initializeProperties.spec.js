import formObservableGenerator from '../../core/formObservableGenerator';
import modelPropGenerator from '../../core/modelProp';
jest.mock('../../core/modelProp');
jest.mock('../../core/formObservableGenerator');

import complexStructure, { descriptor } from '../mocks/complexStructure';
let customTab;
import { initializeProperties } from '../../core/initializeProperties';

describe('initializeProperties', () => {
  beforeEach(() => {
    formObservableGenerator.mockClear();
    modelPropGenerator.mockClear();
    customTab = Object.assign({}, complexStructure);
    initializeProperties(customTab, customTab._properties);
  });
  describe('is once', () => {
    test('initializeProperties change _propertiesInitialized to true', () => {
      expect(customTab._propertiesInitialized).toBeTruthy();
    });
    test('initializeProperties not generate properties if _propertiesInitialized is already true', () => {
      formObservableGenerator.mockClear();
      modelPropGenerator.mockClear();
      customTab.propertiesManager.createProperty.mockClear();
      initializeProperties(customTab, customTab._properties);
      expect(formObservableGenerator.mock.calls.length).toBe(0);
      expect(modelPropGenerator.mock.calls.length).toBe(0);
    });
  });
  describe('call createProperty of propertiesManager', () => {
    test('with all complexTab.propertiesManager.properties array', () => {
      expect(customTab.propertiesManager.createProperty.mock.calls.length).toBe(
        3
      );
      expect(customTab.propertiesManager.createProperty.mock.calls[0][0]).toBe(
        'firstName'
      );
      expect(customTab.propertiesManager.createProperty.mock.calls[1][0]).toBe(
        'lastName'
      );
      expect(customTab.propertiesManager.createProperty.mock.calls[2][0]).toBe(
        'address'
      );
    });
  });
  describe('generate properties', () => {
    test('generate formObservable properties', () => {
      expect(formObservableGenerator.mock.calls.length).toBe(2);
      expect(formObservableGenerator.mock.calls[0][0]).toEqual({
        target: customTab,
        name: 'firstName',
        descriptor,
        validationsManager: {}
      });
      expect(formObservableGenerator.mock.calls[1][0]).toEqual({
        target: customTab,
        name: 'address',
        descriptor,
        validationsManager: {}
      });
    });
    test('generate modelProp properties', () => {
      expect(modelPropGenerator.mock.calls.length).toBe(2);
      expect(modelPropGenerator.mock.calls[0][0]).toEqual({
        target: customTab,
        name: 'firstName',
        descriptor
      });
      expect(modelPropGenerator.mock.calls[1][0]).toEqual({
        target: customTab,
        name: 'lastName',
        descriptor
      });
    });
  });
});
