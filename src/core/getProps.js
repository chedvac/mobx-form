export function getPropsField(store, name){
    // if(store.propertiesManager){
    //             store.propertiesManager.properties[name] = store.propertiesManager.properties[name] ?store.propertiesManager.properties[name] : {@observable message: '', @observable isValid: ''};

    // }
    return ({
        update:store["set_"+name],
        field: store[name],
<<<<<<< HEAD
        message:  store.propertiesManager[name] ? store.propertiesManager[name].message : ''
=======
        message:  store.propertiesManager ? store.propertiesManager.getPropertyValidationState(name).message : ''
>>>>>>> 76a000babe23c5a5a34368646e9a1c269d42fc2a
    })
};