export function getPropsField(store, name) {
  // if(store.propertiesManager){
  //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

  // }
  return {
    update: store['set_' + name],
    field: store[name],
    message: store.formObservablesManager
      ? store.formObservablesManager.getPropertyValidationState(name).message
      : '',
    ...(store.formObservablesManager
      ? store.formObservablesManager.getValidationManagerProperty(name)
          .dataSchema
      : {}),
    immediateRule: store.formObservablesManager
      ? store.formObservablesManager.getValidationManagerProperty(name)
          .immediateRule
      : {}
  };
}
