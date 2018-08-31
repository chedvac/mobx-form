import ModularViewModel from 'core/modularViewModel';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default function validateable(settings = {}) {
  return assertParametersType(
    {
      target: PropTypes.instanceOf(ModularViewModel)
    },
    function validateableDecorator(target, name) {
      target.setValidateableSettings({
        name,
        ...settings
      });
    }
  );
}
