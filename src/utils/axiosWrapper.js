import axios from 'axios';
import qs from 'qs';

const messages = {
  missinggRequiredParams: 'URL and method (GET/POST) parameters are mandatory',
  callbacksNotAllowed:
    'Callback functions are not allowed. used the returned promise instead',
  syncRequestNotAllowed: 'only async requests are supported'
};

const validMethod = function(method) {
  return ['GET', 'POST'].includes(method);
};

const checkRequiredParams = function(settings) {
  return (
    typeof settings === 'object' &&
    'url' in settings &&
    validMethod(settings['method'])
  );
};

const checkForCallbacks = function(settings) {
  return settings.hasOwnProperty('success') || settings.hasOwnProperty('error');
};

const checkForAsyncRequest = function(settings) {
  if (settings.hasOwnProperty('async') ? settings.async === false : false) {
    throw new Error(messages.syncRequestNotAllowed);
  }
};

const request = function(settings) {
  if (!checkRequiredParams(settings)) {
    throw new Error(messages.missinggRequiredParams);
  }

  if (checkForCallbacks(settings)) {
    throw new Error(messages.callbacksNotAllowed);
  }

  checkForAsyncRequest(settings);

  settings.data = qs.stringify(settings.data);

  return axios(settings).catch(function(error) {
    error.url = settings.url;
    error.method = settings.method;
    throw error;
  });
};

export default request;
// const response = yield
// request({url: 'http://formsdev.vcloud.gov.il/govservicelist/ListProvider/GetList',
// method: 'POST',
// data: qs.stringify({listName: 'City'})})
//            this.cityList = response.data.Data.List.map(item => ({key: item.city_code, value: item.city_name_he}));        }
