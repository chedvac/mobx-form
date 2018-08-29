import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import request from 'utils/serviceRequest';

const defaultSettings = {
  method: 'GET'
};

const localMockUrl = 'http://formsdev.vcloud.gov.il/'; //TODO: TEMP, wait to F5
/**
 * get govServiceList Request
 * @method govServiceListRequest
 * @param {json} settings settings for the request
 * @param {string} settings.route
 * @example Example usage of govServiceListRequest:
 * var settings = {route:'TSA/GetTime'};
 * services.govServiceListRequest(settings)
 * @returns {object} promise.
 */
export default assertParametersType(
  {
    settings: PropTypes.shape({
      route: PropTypes.string.isRequired
    })
  },
  function govServiceListRequest(settings) {
    settings = Object.assign({}, defaultSettings, settings);
    settings.url = 'govservicelist' + '/' + settings.route; //TODO domain
    if (process.env.NODE_ENV === 'development') {
      settings.url = localMockUrl + settings.url;
    }
    return request(settings);
  }
);
