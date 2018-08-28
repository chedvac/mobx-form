export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  const {
    maxlength,
    minlength,
    pattern,
    required
  } = store.validateablesSettings[name].validationsManager;
  return {
    update: store.getAction(name),
    value: store[name], //todo: not fire reactionValue
    validationState: store.validateablesSettings[name].validationState,
    validateCharsPattern:
      store.validateablesSettings[name].validationsManager.validateCharsPattern,
    maxlength,
    minlength,
    pattern,
    required
  };
}
