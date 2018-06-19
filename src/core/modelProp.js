import {observable} from "mobx";
import {defineComplexTypeProperty} from './initializeComplexType';
export  function modelPropGenerator ({target, name, descriptor, ...params} = params) {
    var defaultValue = descriptor? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    const map=(value1)=>{
        return typeof params.map === 'function' ? params.map(value1) : value1;
    };
    const reset=()=>{
        return typeof params.reset === 'function' ? params.reset(defaultValue) : typeof target.reset === 'function' ? target.reset(defaultValue) :  descriptor.set(defaultValue);
    };
    target.initialProperty(name, { map, reset, ref: descriptor});
}
export default function modelProp(settings = {}) {
    return  function (target, name, descriptor) {
        defineComplexTypeProperty({target, name, descriptor, isModelProp: true, ...settings})
        if(descriptor.value === undefined){
            descriptor.value = {};
            descriptor.writable = true;
        }
        return descriptor;
    }
    
}
