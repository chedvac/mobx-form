export default function modelProp(settings = {}) {
  return function(target, name, descriptor) {
    const defaultValue = descriptor
      ? descriptor.initializer
        ? descriptor.initializer.call(target)
        : descriptor.value
      : undefined;

    target.setModelPropSettings({
      name,
      defaultValue,
      ...settings
    });

    descriptor.configurable = true;
    descriptor.writable = true;
  };
}
