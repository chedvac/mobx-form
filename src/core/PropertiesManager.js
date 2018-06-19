import {observable} from 'mobx'

class Property {
    constructor(settings){
        Object.assign(this, settings)
        // this.reset = settings.reset;
        // this.validate = settings.validate;
        // this.map = settings.map;
        // this.validationsManager = settings.validationsManager;
        // this.ref = settings.ref;
    };
    @observable message = '';
    @observable isValid = '';
};

export default class PropertiesManager {
    constructor(){
        this.setProperty = this.setProperty.bind(this);
        this.applyChildAction = this.applyChildAction.bind(this);
        this.validate = this.validate.bind(this);
    }
    properties = {};
    setProperty = function(propertyName, settings){
        if(this.properties[propertyName]){
            Object.assign(this.properties[propertyName], settings);
        }
        else{
            this.properties[propertyName] = new Property(settings);
        }
    };
    applyChildAction(actionName){
        for (const property in this.properties) {
            typeof this.properties[property][actionName] === 'function' ? this.properties[property][actionName]() : false;
        }
    }
    validateChild(child, parent){
        return typeof child['validate'] === 'function' ? child.validate(parent) : true;
    };
    validate(parent){
        let isValid = true; 
        for (const property in this.properties) {
            isValid = this.validateChild(this.properties[property], parent) ? isValid : false; 
       }
       return isValid;
    }
    // reset(parent){
    //     let childrenValid = true; 
    //     for (const property in this.propertiesManager) {
    //         if(!property.validate(parent)){
    //             childrenValid = false 
    //         }
    //    }
    //    return childrenValid;
    // }

}