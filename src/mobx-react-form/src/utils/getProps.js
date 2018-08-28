export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  const {
    maxlength,
    minlength,
    pattern,
    required
  } = store.validateablesProperties[name].validationsManager;
  return {
    update: store['set_' + name],
    value: store.validateablesProperties[name].ref,
    validationState: store.validateablesProperties[name].validationState,
    validateCharsPattern:
      store.validateablesProperties[name].validationsManager
        .validateCharsPattern,
    maxlength,
    minlength,
    pattern,
    required
  };
}
