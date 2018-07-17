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
  test('agreement', () => {
    expect(formObservableGenerator.mock.calls[0][0]).toBeDefined();
  });
});
