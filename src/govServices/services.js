import request from '../utils/axiosWrapper';
import Exception from 'core/exeptions';
import locallMockUrl from '../external/locallMockUrl';
import _ from 'lodash';

const messages = {
  missinggRequiredParams:
    'settings parameter is mandatory and should be contains route property',
  invalidDomain: 'serverName parameter should be one of govServiceList domains'
};

const govServiceListSettings = {
  dataType: 'json',
  cache: true,
  crossDomain: true
};

function checkRequiredParams(settings) {
  return typeof settings === 'object' && 'route' in settings;
}

function getRequest(settings, serviceType, defaultSettings) {
  if (!checkRequiredParams(settings)) {
    throw new Exception(messages.missinggRequiredParams);
  }
  settings = _.assign({}, defaultSettings, settings);
  settings.url = serviceType + '/' + settings.route;
  if (process.env.NODE_ENV === 'development') {
    settings.url = locallMockUrl + settings.url;
  }
  return request(settings);
}

export default function govServiceListRequest(settings) {
  return getRequest(settings, 'govservicelist', govServiceListSettings);
}
