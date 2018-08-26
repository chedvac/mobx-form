export default function modelProp(settings = {}) {
  return function(target, name, descriptor) {
    target.setModelPropSettings({
      name,
      ...settings
    });
    const descriptorInitialized = descriptor =>
      descriptor.value !== undefined ||
      descriptor.set ||
      descriptor.initializer;

    if (!descriptorInitialized(descriptor)) {
      descriptor.configurable = true;
      descriptor.writable = true;
    }
    return descriptor;
  };
}
