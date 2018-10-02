import languageStore from 'govil-common-content/forms-business-components/src/language';

export function getPropsField(store, name, applicationData) {
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
    name: name,
    value: store,
    language: languageStore.languageName,
    validationState: store.validateablesSettings[name].validationState,
    validateCharsPattern:
      store.validateablesSettings[name].validationsManager.validateCharsPattern,
    maxlength,
    minlength,
    pattern,
    required
  };
}
