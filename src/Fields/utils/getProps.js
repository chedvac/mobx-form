export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  return {
    // update: store['set_' + name],
    update: store.getAction(name),
    field: store[name],
    message: store.validateablesProperties
      ? store.validateablesProperties[name].validationState.message
      : ''
  };
}