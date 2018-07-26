import { generateRegexValidation } from 'validations/core/validationsFactory';
import messages from 'validations/messages/text';
import regex from '../regularExpressions/text';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';

export function hebrew(params = {}) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'hebrew');
  let { message } = params;
  return generateRegexValidation({
    name: 'hebrew',
    message: () => messages.hebrew(),
    params,
    regex: regex.hebrew
  });
}

export function english(params = {}) {
  const paramsPropTypes = {
    params: PropTypes.shape({
      message: PropTypes.func
    })
  };
  assertParametersType({ params }, paramsPropTypes, 'english');
  let { message } = params;
  return generateRegexValidation({
    name: 'english',
    message: () => messages.hebrew(),
    params,
    validator: regex.english
  });
}
