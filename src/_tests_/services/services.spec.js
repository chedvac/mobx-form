import services from '../../services/services';
import request from '../../utils/axiosWrapper';
import axios from 'axios';
jest.mock('axios');

describe('services', () => {
  const fakedSuccessResponse = { data: [{ name: 'Avi' }] };

  test('should be defined', () => {
    expect(services).toBeDefined();
  });

  beforeEach(function() {
    axios.mockImplementation(() => Promise.resolve(fakedSuccessResponse));
  });
  describe('govServiceListRequest method', () => {
    test('govServiceListRequest function', () => {
      expect(typeof services.govServiceListRequest).toBe('function');
    });

    describe('parameters', () => {
      test('settings object is mandatory ', () => {
        expect(() => {
          services.govServiceListRequest().toThrow();
        });
      });

      test('settings must be an object', () => {
        expect(() => {
          services.govServiceListRequest('aaa').toThrow();
        });
      });

      test('route is mandatory ', () => {
        expect(() => {
          services.govServiceListRequest({ method: 'POST' }).toThrow();
        });
      });

      test('only route is mandatory ', () => {
        expect(() => {
          services.govServiceListRequest({ route: 'ListProvider/getList' });
        }).not.toThrow();
      });
    });

    test('returned value is a promise', done => {
      const settings = {
        route: 'TSA/GetTime'
      };
      const promise = services.govServiceListRequest(settings);
      setTimeout(function() {
        expect(typeof promise === 'object').toBeTruthy();
        expect(typeof promise.then === 'function').toBeTruthy();
        done();
      }, 1);
    });
  });
});
