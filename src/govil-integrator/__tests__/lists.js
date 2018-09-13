import { getList2 } from '../src/lists';

describe('lists', () => {
  describe('getList2', () => {
    test('should be defined', () => {
      expect(getList2).toBeDefined();
    });

    describe('params', () => {
      describe('missing required params and incorrect params type should throw', () => {
        test('settings object is mandatory ', () => {
          expect(() => {
            getList2().toThrow();
          });
        });
        test('settings must be an object', () => {
          expect(() => {
            getList2('aaa').toThrow();
          });
        });
        test('listName is mandatory and must be string', () => {
          expect(() => {
            getList2({ code: 'code', value: 'value' }).toThrow();
          });
          expect(() => {
            getList2({
              code: 'code',
              value: 'value',
              listName: () => 'listName'
            }).toThrow();
          });
        });
        test('code is mandatory and must be string ', () => {
          expect(() => {
            getList2({ listName: 'listName', value: 'value' }).toThrow();
          });
          expect(() => {
            getList2({
              listName: 'listName',
              code: 1,
              value: 'value'
            }).toThrow();
          });
        });
        test('value is mandatory and must be string ', () => {
          expect(() => {
            getList2({ code: 'code', listName: 'listName' }).toThrow();
          });
          expect(() => {
            getList2({
              listName: 'listName',
              code: 'code',
              value: true
            }).toThrow();
          });
        });
      });
      test('correct params should not throw', () => {
        test('settings object is mandatory ', () => {
          expect(() => {
            getList2({
              listName: 'listName',
              code: 'code',
              value: 'value'
            }).not.toThrow();
          });
        });
      });
    });
  });
});
