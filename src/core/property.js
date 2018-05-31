import validationsManagerFactory from "../validations/validationsManager"
export default function property(settings = {}) {
    const validationsManager = new validationsManagerFactory(settings.validations || []);
    return  function (target, name, descriptor) {
        target._properties = target._properties || {};
        target._properties[name] = {
            name,
            descriptor,
            validationsManager
        }
       
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