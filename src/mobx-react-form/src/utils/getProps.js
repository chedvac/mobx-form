export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  const {
    maxlength,
    minlength,
    pattern,
    required
  } = store.formObservablesManager[name].validationsManager;
  return {
    update: store['set_' + name],
    value: store.formObservablesManager[name].ref,
    validationState: store.formObservablesManager[name].validationState,
    validateCharsPattern:
      store.formObservablesManager[name].validationsManager
        .validateCharsPattern,
    maxlength,
    minlength,
    pattern,
    required
  };
}
