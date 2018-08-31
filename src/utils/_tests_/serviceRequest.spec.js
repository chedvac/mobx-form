import request from 'utils/serviceRequest';
import axios from 'axios';

jest.mock('axios');

describe('service request', () => {
  let settings = {};
  beforeEach(() => {
    settings = {
      url: 'fakedURL',
      method: 'GET'
    };
  });
  test('should be defined', () => {
    expect(request).toBeDefined();
  });

  describe('params', () => {
    test('settings object is mandatory ', () => {
      expect(() => {
        request().toThrow();
      });
    });

    test('settings must be an object', () => {
      expect(() => {
        request(JSON.stringify(settings)).toThrow();
      });
    });

    test('url is mandatory ', () => {
      expect(() => {
        request({ method: settings.method });
      }).toThrow();
    });

    test('method is mandatory ', () => {
      expect(() => {
        request({ url: settings.url });
      }).toThrow();
    });

    test('method is case sensitive ', () => {
      expect(() => {
        request({ url: settings.url, METHOD: settings.method });
      }).toThrow();
    });

    test('url is case sensitive ', () => {
      expect(() => {
        request({ URL: settings.url, method: settings.method });
      }).toThrow();
    });

    test('only url and method are mandatory ', () => {
      expect(() => {
        request(settings);
      }).not.toThrow();
    });

    test('POST method is valid ', () => {
      expect(() => {
        request({ url: settings.url, method: 'POST' });
      }).not.toThrow();
    });

    test('DELETE method is invalid ', () => {
      expect(() => {
        request({ url: settings.url, method: 'DELETE' });
      }).toThrow();
    });

    test('PUT method is invalid ', () => {
      expect(() => {
        request({ url: settings.url, method: 'PUT' });
      }).toThrow();
    });

    test('data should be convert to queary string', () => {
      request({ ...settings, data: { a: '1', b: '2' } });
      expect(axios).lastCalledWith(
        expect.objectContaining({
          data: expect.stringMatching('a=1&b=2')
        })
      );
    });

    test('data should be empty if not sent as json', () => {
      request({ ...settings, data: 'a = 1, b = 2 ' });
      expect(axios).lastCalledWith(
        expect.objectContaining({
          data: expect.stringMatching('')
        })
      );
      request({ ...settings, data: `{ a: '1', b: '2' }` });
      expect(axios).lastCalledWith(
        expect.objectContaining({
          data: expect.stringMatching('')
        })
      );
    });
  });
  describe('request', () => {
    test('axios should be called', () => {
      request(settings);
      expect(axios).toBeCalled();
    });
  });
});
