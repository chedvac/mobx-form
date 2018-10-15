import { getMemberType, enumeTypes } from 'mobx-vm/modelMemberTypes';
import ModularViewModel from 'mobx-vm/modularViewModel';
import { observable } from 'mobx';

describe('getMemberType method', () => {
  test('is defined', () => {
    expect(getMemberType).toBeDefined();
  });
  describe('return params', () => {
    describe('return enumeTypes of member', () => {
      test('return enumeTypes modularViewModel of modularViewModel instance', () => {
        const modular = new ModularViewModel();
        expect(getMemberType(modular)).toEqual(enumeTypes.modularViewModel);
      });
      test('return enumeTypes array of observableArray member', () => {
        const array = observable([]);
        expect(getMemberType(array)).toEqual(enumeTypes.array);
      });
      test('return enumeTypes primitive of primitive member', () => {
        const member = observable([]);
        expect(getMemberType(member)).toEqual(enumeTypes.array);
      });
    });
    test('throw error of undefined type', () => {
      const member = [];
      expect(() => {
        getMemberType(member);
      }).toThrow();
    });
  });
});
