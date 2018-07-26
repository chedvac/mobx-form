import {inject} from 'mobx-react';
import {observable} from "mobx"

export const injectWrapper = function(wrappedObject, customizeStore = {}){
    return inject(
        stores => ( {
            ...stores,
            customizeStore
        }) )(wrappedObject);
};

export const getPropsInject =(wrappedObject,store,name)=>{
    return inject(stores => {
       /* if(store.propertiesManager){
                    store.propertiesManager[name] = store.propertiesManager[name] ?store.propertiesManager[name] : {@observable message: '', @observable isValid: ''};

        }*/
        return ({
            update:store.getAction(name),
            field:  store[name],
            message:  store.formObservablesManager.getProperty(name) ? store.formObservablesManager[name].message : '',
            ...stores
        })
    })(wrappedObject);
}
