import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"
import propertyCreator from './propertyCreator'
export default function property(settings = {}) {
    const validationsManager = new validationsManagerFactory(settings.validations || []);
    const  initializeInstance = function(complexTypeInstance){
        if (complexTypeInstance._propertiesInitialized === true)
            return;
        var properties = complexTypeInstance._properties;
        complexTypeInstance._propertiesInitialized = true;
        for (var key in properties) {
            propertyCreator({target: complexTypeInstance, name: properties[key].name , descriptor: properties[key].descriptor, validationsManager})

        }
    }
    return  function (target, name, descriptor) {
        target._properties = target._properties || {};
        target._initializeInstance = target._initializeInstance || initializeInstance;
        target._properties[name] = {
            name,
            descriptor
        }
       
        return Object.defineProperty(target, name, {
            configurable: true,
            enumerable: true,
            get: function () {
                initializeInstance(this);
                // return ''
                return this[name];
            },
            set: function (value) {
                initializeInstance(this);
                this[name] = value;
            }
        })
        
    }
    
}