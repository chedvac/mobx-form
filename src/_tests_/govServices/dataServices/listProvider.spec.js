import listProvider from 'services/dataServices/listProvider';
import services from 'services/services';
jest.mock('services/services');

describe('listProvider - ', () => {
  let requestSettings = {};
  beforeEach(() => {
    services.govServiceListRequest.mockImplementation(settings => {
      requestSettings = settings;
      return Promise.resolve([
        { dataText: 'משטרת ישראל', dataCode: '0' },
        { dataCode: '1', dataText: ' 1משטרת ישראל' }
      ]);
    });
  });

  describe('getList - ', () => {
    test('getList function', () => {
      expect(typeof listProvider.getList).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        listProvider.getList({});
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = listProvider.getList({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetList');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = listProvider.getList({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.data).toEqual({ listName: 'Police' });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = listProvider.getList(
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
      expect(typeof listProvider.getLists).toBe('function');
    });
    test('missing require param paramsList should throw error', () => {
      expect(() => {
        listProvider.getLists({});
      }).toThrow();
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        listProvider.getLists({ paramsList: [{ sortColumn: 'Police' }] });
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should create request to ListProvider/GetLists', () => {
        expect.assertions(1);
        const list = listProvider.getLists({
          paramsList: [{ listName: 'Police' }]
        });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetLists');
        });
      });
      test('should pass data include paramsList', () => {
        expect.assertions(1);
        const list = listProvider.getLists({
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
        const list = listProvider.getLists(
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
      expect(typeof listProvider.getEntityBase).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        listProvider.getEntityBase({
          dataCodeColumn: 'code',
          dataTextColumn: 'name'
        });
      }).toThrow();
    });
    test('missing require param dataCodeColumn should throw error', () => {
      expect(() => {
        listProvider.getEntityBase({
          listName: 'Police',
          dataTextColumn: 'name'
        });
      }).toThrowError(
        'missing required param dataCodeColumn, listName: Police in GetAsEntityBase function (listProvider module)'
      );
    });
    test('missing require param dataTextColumn should throw error', () => {
      expect(() => {
        listProvider.getEntityBase({
          listName: 'Police',
          dataCodeColumn: 'code'
        });
      }).toThrowError(
        'missing required param dataTextColumn, listName: Police. in GetAsEntityBase function (listProvider module)'
      );
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = listProvider.getEntityBase({
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
        const list = listProvider.getEntityBase({
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
        const list = listProvider.getEntityBase(
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
      expect(typeof listProvider.getEntityBaseLists).toBe('function');
    });
    test('missing require param paramsList should throw error', () => {
      expect(() => {
        listProvider.getEntityBaseLists({});
      }).toThrow();
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        listProvider.getEntityBaseLists({
          paramsList: [{ dataCodeColumn: 'code', dataTextColumn: 'name' }]
        });
      }).toThrow();
    });
    test('missing require param dataCodeColumn should throw error', () => {
      expect(() => {
        listProvider.getEntityBaseLists({
          paramsList: [{ listName: 'Police', dataTextColumn: 'name' }]
        });
      }).toThrowError(
        'missing required param dataCodeColumn, listName: Police in GetAsEntityBaseLists function (listProvider module)'
      );
    });
    test('missing require param dataTextColumn should throw error', () => {
      expect(() => {
        listProvider.getEntityBaseLists({
          paramsList: [{ listName: 'Police', dataCodeColumn: 'code' }]
        });
      }).toThrowError(
        'missing required param dataTextColumn, listName: Police. in GetAsEntityBaseLists function (listProvider module)'
      );
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/getEntityBaseLists', () => {
        expect.assertions(1);
        const list = listProvider.getEntityBaseLists({
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
        const list = listProvider.getEntityBaseLists({
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
        const list = listProvider.getEntityBaseLists(
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
      expect(typeof listProvider.getFirstItem).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        listProvider.getFirstItem({});
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = listProvider.getFirstItem({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/GetFirstItem');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = listProvider.getList({ listName: 'Police' });
        return list.then(() => {
          expect(requestSettings.data).toEqual({ listName: 'Police' });
        });
      });
      test('avaliable to add/run over settings', () => {
        expect.assertions(2);
        const list = listProvider.getList(
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
      expect(typeof listProvider.IsExistItem).toBe('function');
    });
    test('missing require param listName should throw error', () => {
      expect(() => {
        listProvider.IsExistItem({ filters: [{}] });
      }).toThrow();
    });
    test('missing require param filters should throw error', () => {
      expect(() => {
        listProvider.IsExistItem({ listName: 'City' });
      }).toThrow();
    });
    describe('correct params - ', () => {
      test('should creste request to ListProvider/GetList', () => {
        expect.assertions(1);
        const list = listProvider.IsExistItem({
          listName: 'Police',
          filters: [{}]
        });
        return list.then(() => {
          expect(requestSettings.route).toEqual('ListProvider/IsExistItem');
        });
      });
      test('should pass data include listName', () => {
        expect.assertions(1);
        const list = listProvider.IsExistItem({
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
        const list = listProvider.IsExistItem(
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
