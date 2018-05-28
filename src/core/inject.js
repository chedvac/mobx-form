import {inject} from 'mobx-react';

const injectWrapper = function(wrappedObject, customizeStore = {}){
    return inject(
        stores => ( {
            general:{},
            model: customizeStore
        }) )(wrappedObject);
};
export default injectWrapper;