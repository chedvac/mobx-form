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
            update:store["set_"+name],
            field: store[name],
            language: /*stores.rootStore.formlanguage.name*/'hebrew',
            //message:store.propertiesManager[name].validationsManager.message,
        })
    )(wrappedObject);
}
