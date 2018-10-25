export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  const { maxlength, minlength, pattern, required } = store.validateables[
    name
  ].validationsManager;
  return {
    update: store.getAction(name),
    name,
    value: store,
    validationState: store.validateables[name].validationState,
    validateCharsPattern:
      store.validateables[name].validationsManager.validateCharsPattern,
    validateType: store.validateables[name].validationsManager.validateType,
    maxlength,
    minlength,
    pattern,
    required,
    type: store.validateables[name].type
  };
}
