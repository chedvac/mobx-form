import {inject} from 'mobx-react';

export const injectWrapper = function(wrappedObject, customizeStore = {}){
    return inject(
        stores => ( {
            general:{
                //formLanguage: stores.store.rootStore.formlanguage
            },
            ...customizeStore
        }) )(wrappedObject);
};

export const getPropsInject =(wrappedObject,store,name)=>{
    return inject(stores => 
        ({
            update:store.actions["set_"+name],
            field: store.model[name],
            message: store.propertiesManager[name] ? store.propertiesManager[name].validationsManager.message : '',
            language: /*stores.rootStore.formlanguage.name*/'hebrew'
        })
    )(wrappedObject);
}
