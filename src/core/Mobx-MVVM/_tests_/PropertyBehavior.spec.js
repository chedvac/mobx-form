import PropertyBehavior from '../../core/PropertyBehavior';
import ValidationState from '../../core/ValidationState';
import { observable } from 'mobx';
import ValidationsManager from '../../validations/validationsManager';

let property;
beforeEach(() => {
  property = new PropertyBehavior();
});
describe('PropertyBehavior', () => {
  describe('properties', () => {
    test('validationState', () => {
      expect(property.validationState).toBeDefined();
      expect(property.validationState instanceof ValidationState).toBeTruthy();
    });
    test('dependedObservables', () => {
      expect(property.dependedObservables).toBeDefined();
      expect(property.dependedObservables).toEqual({});
    });
    describe('setRef', () => {
      test('is function', () => {
        expect(typeof property.setRef).toBe('function');
      });
      test('define ref as  property of PropertyBehavior', () => {
        const ref = observable.box('ref');
        property.setRef(ref);
        expect(property.ref).toEqual(ref);
      });
    });
    describe('setMap', () => {
      test('is function', () => {
        expect(typeof property.setMap).toBe('function');
      });
      test('define map as  property of PropertyBehavior', () => {
        const map = () => true;
        property.setMap(map);
        expect(property.map).toEqual(map);
      });
    });
    describe('setReset', () => {
      test('is function', () => {
        expect(typeof property.setReset).toBe('function');
      });
      test('define map as  property of PropertyBehavior', () => {
        const reset = () => true;
        property.setReset(reset);
        expect(property.reset).toEqual(reset);
      });
    });
    describe('setValidate', () => {
      test('is function', () => {
        expect(typeof property.setValidate).toBe('function');
      });
      test('define validate as  property of PropertyBehavior', () => {
        const validate = () => true;
        property.setValidate(validate);
        expect(property.validate).toEqual(validate);
      });
    });
    describe('setValidationsManager', () => {
      test('is function', () => {
        expect(typeof property.setValidationsManager).toBe('function');
      });

      test('define validationsManager as instanceof ValidationsManager only', () => {
        let vm = {};
        expect(() => {
          property.setValidationsManager(vm);
        }).toThrowError(
          'setValidationsManager expect to get object that extends  ValidationsManager'
        );
        vm = new ValidationsManager();
        property.setValidationsManager(vm);
        expect(property.validationsManager).toEqual(vm);
      });
    });
    describe('setDependedObservables', () => {
      test('is function', () => {
        expect(typeof property.setDependedObservables).toBe('function');
      });
      test('define dependedObservables as property of PropertyBehavior', () => {
        const dependedObservables = {};
        property.setDependedObservables(dependedObservables);
        expect(property.dependedObservables).toEqual(dependedObservables);
      });
    });
  });
});
