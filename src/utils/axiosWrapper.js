import axios from 'axios';
import qs from 'qs';

const messages = {
  missinggRequiredParams: 'URL and method (GET/POST) parameters are mandatory',
  callbacksNotAllowed:
    'Callback functions are not allowed. used the returned promise instead',
  syncRequestNotAllowed: 'only async requests are supported'
};

function validMethod(method) {
  return ['GET', 'POST'].includes(method);
}

function checkRequiredParams(settings) {
  return (
    typeof settings === 'object' &&
    'url' in settings &&
    validMethod(settings['method'])
  );
}

function checkForCallbacks(settings) {
  return settings.hasOwnProperty('success') || settings.hasOwnProperty('error');
}

function checkForAsyncRequest(settings) {
  if (settings.hasOwnProperty('async') ? settings.async === false : false) {
    throw new Error(messages.syncRequestNotAllowed);
  }
}

export default function request(settings) {
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
}
