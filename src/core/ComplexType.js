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
        this.isValid = true;
        this.validationsManager = new validationsManagerFactory(settings.validations || []);
        this.initialProperty = this.initialProperty.bind(this);
        this.applyChildAction = this.applyChildAction.bind(this);
        this.validate = this.validate.bind(this);
        this.setValidations = this.setValidations.bind(this);
        initializeInstance(this);
    }  
    setValidations(validations = []){
        this.validationsManager.setValidations(validations);
    };
    initialProperty (propertyName, settings) {
        this.propertiesManager.setProperty(propertyName, settings);   
    };
    applyChildAction (action){
       this.propertiesManager.applyChildAction(action);
    };
    validate (){           
        let validationResult = this.validationsManager.validate(this);
        Object.assign(this, validationResult);
        this.isValid = this.propertiesManager.validate(this) ? this.isValid : false;
        return this.isValid         
    };
  };
