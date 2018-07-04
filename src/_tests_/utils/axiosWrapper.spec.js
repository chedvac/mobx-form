import request from '../../utils/axiosWrapper';
import axios from 'axios';
jest.mock('axios');

describe('axiosWrapper', () => {
  const fakedSuccessResponse = { data: [{ name: 'Avi' }] };
  const fakedFailureResponse = { responseText: 'invalid request' };
  describe('request method', () => {
    let result;
    let settings = {};

    beforeEach(() => {
      settings = {
        url: 'fakedURL',
        method: 'GET'
      };
      // formMode.mode('client');
    });

    test('should be defined', () => {
      expect(typeof request).toBe('function');
    });

    describe('params', () => {
      beforeEach(function() {
        axios.mockImplementation(() => Promise.resolve(fakedSuccessResponse));
      });

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

      test('sync request is denied ', () => {
        expect(() => {
          request({ url: settings.url, method: 'POST', async: false });
        }).toThrow();
      });
    });

    describe('block callbacks', function() {
      let settings1;

      beforeEach(function() {
        axios.mockImplementation(() => Promise.resolve(fakedSuccessResponse));
        settings1 = Object.create(settings);
      });

      test('no callback no exception ', function() {
        expect(function() {
          request(settings1);
        }).not.toThrow();
      });

      test('success callback is not allowed ', function() {
        settings1.success = function() {};
        expect(function() {
          request(settings1);
        }).toThrow();
      });

      test('error callback is not allowed ', function() {
        settings1.error = function() {};
        expect(function() {
          request(settings1);
        }).toThrow();
      });
    });

    describe('return a promise', function() {
      test('success handler is called when promise is resolved', done => {
        axios.mockImplementation(() => Promise.resolve(fakedSuccessResponse));

        request(settings).then(
          function(response) {
            expect(typeof response).toEqual('object');
            expect(response.name).toEqual(fakedSuccessResponse.name);
            done();
          },
          function(jqXHR) {
            result = jqXHR;
          }
        );
      });

      test('compose resolved promises', done => {
        axios.mockImplementation(() => Promise.resolve(fakedSuccessResponse));

        let moreResults;

        request(settings)
          .then(
            function(response) {
              result = response;
              return request(settings);
            },
            function(jqXHR) {
              result = jqXHR;
            }
          )
          .then(
            function(response) {
              moreResults = response;
              expect(typeof result).toEqual('object');
              expect(result.name).toEqual(fakedSuccessResponse.name);
              expect(moreResults.name).toEqual(fakedSuccessResponse.name);
              done();
            },
            function(jqXHR) {
              result = jqXHR;
            }
          );
      });

      test('failure handler callback is called when promise is rejected', () => {
        expect.assertions(2);
        axios.mockImplementation(() => Promise.reject(fakedFailureResponse));
        return request(settings).then(
          function(response) {
            result = response;
          },
          function(jqXHR) {
            result = jqXHR;
            expect(typeof result).toEqual('object');
            expect(result.responseText).toEqual(
              fakedFailureResponse.responseText
            );
          }
        );
      });

      test('failure handler is called when promise is rejected', () => {
        expect.assertions(2);
        axios.mockImplementation(() => Promise.reject(fakedFailureResponse));
        return request(settings).catch(function(jqXHR) {
          result = jqXHR;
          expect(typeof result).toEqual('object');
          expect(result.responseText).toEqual(
            fakedFailureResponse.responseText
          );
        });
      });

      test('url and method set on error object when promise is rejected', () => {
        expect.assertions(2);
        axios.mockImplementation(() => Promise.reject(fakedFailureResponse));
        return request(settings).catch(jqXHR => {
          expect(jqXHR.url).toEqual(settings.url);
          expect(jqXHR.method).toEqual(settings.method);
        });
      });
    });
  });
});
