
import {inject} from 'mobx-react';
import {lessThan,greaterThan} from '../validations/number'

const validations =(store)=>{
    return {
        age: {
            lessThan: lessThan({number:store.fatherAge})
        },
        fatherAge: {
            greaterThan: greaterThan({number:store.age}),
        }
    }
} 

const getPropsInject =(wrappedObject,store,name)=>{
    return inject(stores => 
        ({
            field: store[name],
            update: store["set_"+name],
            // type: getChildType(store, name),
            // validations:validations(store)[name],
            language: /*stores.rootStore.formlanguage.name*/'hebrew'
        })
    )(wrappedObject);
}

export default getPropsInject;
