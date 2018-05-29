import {inject} from 'mobx-react';
import {observable} from "mobx"

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
    return inject(stores => {
        if(store.propertiesManager){
                    store.propertiesManager[name] = store.propertiesManager[name] ?store.propertiesManager[name] : {@observable message: '', @observable isValid: ''};

        }
        return ({
            update:store.actions["set_"+name],
            field: store.model[name],
            message:  store.propertiesManager ? store.propertiesManager[name].message : '',
            language: /*stores.rootStore.formlanguage.name*/'hebrew'
        })
    })(wrappedObject);
}
