export const modelPropGenerator = function({
  name,
  descriptor,
  defaultValue,
  modelPropsManager,
  ...params
} = params) {
  const map = value1 => {
    return typeof params.map === 'function' ? params.map(value1) : value1;
  };
  const reset = () => {
    return typeof params.reset === 'function'
      ? params.reset(defaultValue)
      : descriptor.set(defaultValue);
  };
  modelPropsManager.setModelProp(name, {
    setMap: map,
    reset
  });
};
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
      descriptor.value = {};
      descriptor.configurable = true;
      descriptor.writable = true;
    }
    return descriptor;
  };
}
