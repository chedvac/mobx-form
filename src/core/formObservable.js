import validationsManagerFactory from "../validations/validationsManager"
import {defineComplexTypeProperty} from './initializeComplexType';
export default function formObservable(settings = {}) {
    const validationsManager = new validationsManagerFactory(settings.validations || []);
    return  function (target, name, descriptor) {
        defineComplexTypeProperty({target, name, descriptor, validationsManager, isFormObservable: true});
        return Object.defineProperty(target, name, {
            configurable: true,
            enumerable: true,
            get: function () {
                return this[name];
            },
            set: function (value) {
                this[name] = value;
            }
        })
        
    }
    
}