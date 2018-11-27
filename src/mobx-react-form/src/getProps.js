export function getPropsField(store, name, texts) {
  const {
    maxlength,
    minlength,
    pattern,
    required,
    validateCharsPattern
  } = store.validateables[name].validationsManager;
  return {
    update: store.getAction(name),
    name: texts[name].get(),
    value: store,
    validationState: store.validateables[name].validationState,
    validateCharsPattern,
    maxlength,
    minlength,
    pattern,
    required
  };
}
