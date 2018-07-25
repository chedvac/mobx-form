export default function modelPropGenerator ({
  name,
  modelPropsManager,
  resetAction,
  ...params
} = params) {
  const map = value1 => {
    return typeof params.map === 'function' ? params.map(value1) : value1;
  };
  const reset = resetAction;
  modelPropsManager.setModelProp(name, {
    map,
    reset
  });
}
