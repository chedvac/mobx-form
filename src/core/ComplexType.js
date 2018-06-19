import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"
import initializeInstance from './initializeComplexType'
import PropertiesManager from './PropertiesManager'
export default class ComplexType {
    @observable isValid = true;
    @observable message = '';
    constructor (settings = {}) {
        this.propertiesManager = new PropertiesManager();      
        ///add volatile views actions
        this.message='';
        this.isValid=true;
        this.validationsManager = new validationsManagerFactory(settings.validations || []);
        this.initialProperty = this.initialProperty.bind(this);
        this.validate = this.validate.bind(this);
        initializeInstance(this);
    }  

    initialProperty (propertyName, settings) {
        this.propertiesManager.setProperty(propertyName, settings);   
    }
      
    applyChildAction (action){//todo private
       this.propertiesManager.applyChildAction(action);
    };

    validate (){           
        let validationResult = this.validationsManager.validate(this);
        Object.assign(this, validationResult);
        this.isValid = this.propertiesManager.validate(this);
        return this.isValid         
    };
   
  
}
