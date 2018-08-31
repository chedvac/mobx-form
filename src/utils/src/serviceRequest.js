import axios from 'axios';
import qs from 'qs';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

/**
 * @function "request"
 * @description wrapp axios for ajax requset
 * @param {Object} settings - The settings for request.
 * @param {string} settings.url - request's url.
 * @param {string} settings.method - GET / POST.
 * @example serviceRequest({url: 'http://example.com', method: 'GET'});
 */
export default assertParametersType(
  {
    settings: PropTypes.shape({
      url: PropTypes.string.isRequired,
      method: PropTypes.oneOf(['GET', 'POST']).isRequired
    })
  },
  function request(settings) {
    settings.data = qs.stringify(settings.data);
    return axios(settings);
  }
);
