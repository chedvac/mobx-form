export function getPropsField(store, name, texts) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
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
    value: store[name],
    validationState: store.validateables[name].validationState,
    validateCharsPattern,
    maxlength,
    minlength,
    pattern,
    required
  };
}
