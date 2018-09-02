import {
  getList,
  getLists,
  getEntityBase,
  getEntityBaseLists,
  getFirstItem,
  IsExistItem
} from '../../src/govServiceList/listProvider';
import govServiceListRequest from '../../src/govServiceList/services';
jest.mock('../../src/govServiceList/services');
describe('listProvider - ', () => {
  let requestSettings = {};
  beforeEach(() => {
    govServiceListRequest.mockImplementation(settings => {
      requestSettings = settings;
      return Promise.resolve([
        { dataText: 'משטרת ישראל', dataCode: '0' },
        { dataCode: '1', dataText: ' 1משטרת ישראל' }
      ]);
    });
  });
  describe('getList - ', () => {
    test('getList function', () => {
      expect(typeof getList).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        getList({});
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = getList({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetList');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = getList({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.data).toEqual({ listName: 'Police' });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = getList(
          { listName: 'Police' },
          { method: 'GET', abc: 'fff' }
        );
        return list.then(() => {
          expect(requestSettings.method).toEqual('GET');
          expect(requestSettings.abc).toEqual('fff');
        });
      });
    });
  });
  describe('getLists - ', () => {
    test('getLists function', () => {
      expect(typeof getLists).toBe('function');
    });
    test('missing require param paramsList should throw error', () => {
      expect(() => {
        getLists({});
      }).toThrow();
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        getLists({ paramsList: [{ sortColumn: 'Police' }] });
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should create request to ListProvider/GetLists', () => {
        expect.assertions(1);
        const list = getLists({
          paramsList: [{ listName: 'Police' }]
        });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetLists');
        });
      });
      test('should pass data include paramsList', () => {
        expect.assertions(1);
        const list = getLists({
          paramsList: [{ listName: 'Police' }]
        });
        return list.then(() => {
          expect(requestSettings.data).toEqual({
            paramsList: [{ listName: 'Police' }]
          });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = getLists(
          { paramsList: [{ listName: 'Police' }] },
          { method: 'GET', abc: 'fff' }
        );
        return list.then(() => {
          expect(requestSettings.method).toEqual('GET');
          expect(requestSettings.abc).toEqual('fff');
        });
      });
    });
  });
  describe('getEntityBase - ', () => {
    test('getEntityBase function', () => {
      expect(typeof getEntityBase).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        getEntityBase({
          dataCodeColumn: 'code',
          dataTextColumn: 'name'
        });
      }).toThrow();
    });
    test('missing require param dataCodeColumn should throw error', () => {
      expect(() => {
        getEntityBase({
          listName: 'Police',
          dataTextColumn: 'name'
        });
      }).toThrow();
    });
    test('missing require param dataTextColumn should throw error', () => {
      expect(() => {
        getEntityBase({
          listName: 'Police',
          dataCodeColumn: 'code'
        });
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = getEntityBase({
          listName: 'Police',
          dataCodeColumn: 'code',
          dataTextColumn: 'name'
        });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetAsEntityBase');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = getEntityBase({
          listName: 'Police',
          dataCodeColumn: 'code',
          dataTextColumn: 'name'
        });
        return list.then(() => {
          expect(requestSettings.data).toEqual({
            listName: 'Police',
            dataCodeColumn: 'code',
            dataTextColumn: 'name'
          });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = getEntityBase(
          {
            listName: 'Police',
            dataCodeColumn: 'code',
            dataTextColumn: 'name'
          },
          { method: 'GET', abc: 'fff' }
        );
        return list.then(() => {
          expect(requestSettings.method).toEqual('GET');
          expect(requestSettings.abc).toEqual('fff');
        });
      });
    });
  });
  describe('getEntityBaseLists - ', () => {
    test('getEntityBaseLists function', () => {
      expect(typeof getEntityBaseLists).toBe('function');
    });
    test('missing require param paramsList should throw error', () => {
      expect(() => {
        getEntityBaseLists({});
      }).toThrow();
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        getEntityBaseLists({
          paramsList: [{ dataCodeColumn: 'code', dataTextColumn: 'name' }]
        });
      }).toThrow();
    });
    test('missing require param dataCodeColumn should throw error', () => {
      expect(() => {
        getEntityBaseLists({
          paramsList: [{ listName: 'Police', dataTextColumn: 'name' }]
        });
      }).toThrow();
    });
    test('missing require param dataTextColumn should throw error', () => {
      expect(() => {
        getEntityBaseLists({
          paramsList: [{ listName: 'Police', dataCodeColumn: 'code' }]
        });
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/getEntityBaseLists', () => {
        expect.assertions(1);
        const list = getEntityBaseLists({
          paramsList: [
            {
              listName: 'Police',
              dataCodeColumn: 'code',
              dataTextColumn: 'name'
            }
          ]
        });
        return list.then(() => {
          expect(requestSettings.route).toEqual(
            'ListProvider/GetAsEntityBaseLists'
          );
        });
      });
      test('should pass data include paramsList', () => {
        expect.assertions(1);
        const list = getEntityBaseLists({
          paramsList: [
            {
              listName: 'Police',
              dataCodeColumn: 'code',
              dataTextColumn: 'name'
            }
          ]
        });
        return list.then(() => {
          expect(requestSettings.data).toEqual({
            paramsList: [
              {
                listName: 'Police',
                dataCodeColumn: 'code',
                dataTextColumn: 'name'
              }
            ]
          });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = getEntityBaseLists(
          {
            paramsList: [
              {
                listName: 'Police',
                dataCodeColumn: 'code',
                dataTextColumn: 'name'
              }
            ]
          },
          { method: 'GET', abc: 'fff' }
        );
        return list.then(() => {
          expect(requestSettings.method).toEqual('GET');
          expect(requestSettings.abc).toEqual('fff');
        });
      });
    });
  });
  describe('getFirstItem - ', () => {
    test('getFirstItem function', () => {
      expect(typeof getFirstItem).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        getFirstItem({});
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = getFirstItem({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetFirstItem');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = getList({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.data).toEqual({ listName: 'Police' });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = getList(
          { listName: 'Police' },
          { method: 'GET', abc: 'fff' }
        );
        return list.then(() => {
          expect(requestSettings.method).toEqual('GET');
          expect(requestSettings.abc).toEqual('fff');
        });
      });
    });
  });
  describe('IsExistItem - ', () => {
    test('IsExistItem function', () => {
      expect(typeof IsExistItem).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        IsExistItem({ filters: [{}] });
      }).toThrow();
    });
    test('missing require param filters should throw error', () => {
      expect(() => {
        IsExistItem({ listName: 'City' });
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = IsExistItem({
          listName: 'Police',
          filters: [{}]
        });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/IsExistItem');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = IsExistItem({
          listName: 'Police',
          filters: [{}]
        });
        return list.then(() => {
          expect(requestSettings.data).toEqual({
            listName: 'Police',
            filters: [{}]
          });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = IsExistItem(
          { listName: 'Police', filters: [{}] },
          { method: 'GET', abc: 'fff' }
        );
        return list.then(() => {
          expect(requestSettings.method).toEqual('GET');
          expect(requestSettings.abc).toEqual('fff');
        });
      });
    });
  });
});
