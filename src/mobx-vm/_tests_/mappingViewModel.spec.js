import { action, observable } from 'mobx';
import mappingViewModel from 'mobx-vm/mappingViewModel';
import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/modularViewModel';

class ModularExample extends ModularViewModel {
  constructor(settings) {
    super(settings);
  }
  @observable
  @modelMember({
    map: {
      serverMap: {
        from: firstName => `${firstName}!`
      }
    },
    resetIgnore: true
  })
  firstName = 'aaa';
  @observable
  @modelMember({ map: { serverMap: {} } })
  lastName = 'bbb';
  @action.bound
  setFirstName = value => {
    this.firstName = value;
  };
  @action.bound
  setLastName = () => {};
}
class ComplexModular extends ModularViewModel {
  constructor(settings) {
    super(settings);
    const map = {
      serverMap: {
        from: data => ({
          lastName: data.family,
          ...data
        }),
        to: data => ({
          name: data.firstName,
          family: data.lastName
        })
      }
    };
    this.modularMember = new ModularExample({ map });
  }

  @modelMember()
  modularMember;

  @observable
  @modelMember({
    map: { serverMap: { from: firstName => `${firstName} !` } },
    resetIgnore: true
  })
  arrayMember = [new ModularExample()];

  @action.bound
  addArrayMember(item) {
    item = item || new ModularExample();
    this.arrayMember.push(item);
    return item;
  }
}

const data = {
  firstName: 'xxx',
  family: 'yyy'
};
const modularData = {
  modularMember: data
};
let modularExample;
const complexModular = new ComplexModular();
let setFirstName;
let setLastName;
describe('ModularViewModel prototype mapping methods', () => {
  describe('fromJSON', () => {
    test('data and modelMember params is required', () => {
      expect(() => {
        mappingViewModel.fromJSON();
      }).toThrow();
      expect(() => {
        mappingViewModel.fromJSON(data);
      }).toThrow();
      expect(() => {
        mappingViewModel.fromJSON(data, complexModular);
      }).not.toThrow();
    });

    describe('mappingType param', () => {
      beforeAll(() => {
        const map = {
          serverMap: {
            from: data => ({
              lastName: data.family,
              ...data
            }),
            to: data => ({
              name: data.firstName,
              family: data.lastName
            })
          },
          anotherMap: {}
        };
        modularExample = new ModularExample({ map });
        setFirstName = jest.fn();
        setLastName = jest.fn(data => {
          console.log('setLastName', data);
        });
        modularExample.getAction = jest.fn(member => {
          return member === 'firstName' ? setFirstName : setLastName;
        });
      });

      test('auto map if mappingType not sent', () => {
        mappingViewModel.fromJSON(data, modularExample);
        expect(setFirstName).toHaveBeenCalledWith(data.firstName);
        expect(setLastName).not.toHaveBeenCalled();
      });

      test('map by mappingType func', () => {
        // const mockMap = modularExample.map.serverMap.from;
        const spy = jest.spyOn(modularExample.map.serverMap, 'from');
        // modularExample.map.serverMap.from = jest.fn(data => mockMap(data));
        mappingViewModel.fromJSON(data, modularExample, 'serverMap');
        expect(spy).toHaveBeenCalledWith(data);
        expect(setFirstName).toHaveBeenCalled();
        expect(setLastName).toHaveBeenCalled();
        // spy.mockRestore();
      });

      test('set auto map if type sent not exsit', () => {
        mappingViewModel.fromJSON(data, modularExample, 'typeMap');
        expect(setFirstName).toHaveBeenCalledWith(data.firstName);
        expect(setLastName).not.toHaveBeenCalled();
      });

      test('set auto map if mode not exsit', () => {
        mappingViewModel.fromJSON(data, modularExample, 'typeMap');
        expect(setFirstName).toHaveBeenCalledWith(data.firstName);
        expect(setLastName).not.toHaveBeenCalled();
      });
    });
    describe('map primitive type member', () => {
      test('map with mappingType map', () => {
        const mapFirstName = 'xxx!';
        modularExample.modelMembers.firstName.map.serverMap.from = jest.fn(
          () => mapFirstName
        );
        mappingViewModel.fromJSON(data, modularExample, 'serverMap');
        expect(
          modularExample.modelMembers.firstName.map.serverMap.from
        ).toHaveBeenCalled(); //With(data.frstName);
        // expect(setFirstName).toHaveBeenCalledWith(mapFirstName);
      });
    });

    describe('map modul type member', () => {
      test('map with mappingType map', () => {
        complexModular.modularExample.map.serverMap.from = jest.fn();
        mappingViewModel.fromJSON(modularData, complexModular, 'serverMap');
        expect(complexModular.modularExample.map.serverMap.from).toBeCalledWith(
          modularData.modularMember
        );
      });
    });

    // //map array
    // const arrayData={
    //     arrayMember:[data][data][data]
    // }
    // //auto map fill data at array
    // mappingViewModel.fromJSON(modularData, complexModular,'serverMap');
  });
});
