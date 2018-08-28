import ComplexType from 'mobx-vm/complexType';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
export default function validateable(settings = {}) {
  return assertParametersType(
    {
      target: PropTypes.instanceOf(ComplexType)
    },
    function validateableDecorator(target, name) {
      target.setValidateableSettings({
        name,
        ...settings
      });
    }
  );
}
