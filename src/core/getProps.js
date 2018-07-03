export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  return {
    update: store['set_' + name],
    field: store[name],
    message: store.propertiesManager
      ? store.propertiesManager.getPropertyValidationState(name).message
      : ''
  };
}
