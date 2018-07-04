import request from '../utils/axiosWrapper';
import Exception from 'core/exeptions';
import getDomain from '../external/getDomain';
import _ from 'lodash';

const messages = {
  missinggRequiredParams:
    'settings parameter is mandatory and should be contains route property',
  invalidDomain: 'serverName parameter should be one of govServiceList domains'
};

const govServiceListSettings = {
  method: 'GET',
  dataType: 'json',
  cache: true,
  crossDomain: true
};

const checkRequiredParams = settings =>
  typeof settings === 'object' && 'route' in settings;

const getRequest = (settings, serviceType, defaultSettings) => {
  if (!checkRequiredParams(settings)) {
    throw new Exception(messages.missinggRequiredParams);
  }
  const domain = getDomain(serviceType, settings.serverName);
  settings = _.assign({}, defaultSettings, settings);
  settings.url = domain + settings.route;
  return request(settings);
};

const govServiceListRequest = settings =>
  getRequest(settings, 'govServiceListDomains', govServiceListSettings);

export default {
  govServiceListRequest
};
