import ModularViewModel from 'mobx-vm/modularViewModel';
import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

export default function modelMember(settings = {}) {
  return assertParametersType(
    {
      target: PropTypes.instanceOf(ModularViewModel)
    },
    function modelMemberDecorator(target, name, descriptor) {
      const defaultValue = descriptor
        ? descriptor.initializer
          ? descriptor.initializer.call(target)
          : descriptor.value
        : undefined;

      target.setModelMemberSettings({
        name,
        defaultValue,
        ...settings
      });

      descriptor.configurable = true;
      descriptor.writable = true;
    }
  );
}
