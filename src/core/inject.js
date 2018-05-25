import {inject} from 'mobx-react';

const injectWrapper = function(wrappedObject, customizeStore = {}){
    return inject(
        stores => ( {
            general:{}
            ,model: customizeStore
            ,formLanguage:{name:'hebrew'} //stores.store.rootStore.formlanguage
        }) )(wrappedObject);
};
export default injectWrapper;