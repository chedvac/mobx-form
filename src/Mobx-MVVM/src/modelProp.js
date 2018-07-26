export default function modelProp(settings = {}) {
  return function(target, name, descriptor) {
    target.setPropertySettings({
      name,
      descriptor,
      isModelProp: true,
      ...settings
    });

    if (
      descriptor.value === undefined &&
      !descriptor.set &&
      !descriptor.initializer
    ) {
      descriptor.configurable = true;
      descriptor.writable = true;
    }
    return descriptor;
  };
}
