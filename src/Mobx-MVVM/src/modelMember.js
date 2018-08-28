export default function modelMember(settings = {}) {
  return function(target, name, descriptor) {
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
  };
}
