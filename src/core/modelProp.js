export let modelPropGenerator = function({
  name,
  descriptor,
  defaultValue,
  propertiesManager,
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
  propertiesManager.setModelProp(name, {
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
    if (descriptor.value === undefined) {
      descriptor.value = {};
      descriptor.writable = true;
    }
    return descriptor;
  };
}
