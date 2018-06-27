import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager";
import {initializeProperties} from './complexPropertiesRegistration';
import PropertiesManager from './PropertiesManager';
import ValidationState from './ValidationState';

export default class ComplexType {
    constructor (settings = {}) {
        this.propertiesManager = new PropertiesManager();      
        this.validationsManager = new validationsManagerFactory(settings.validations || []);
        this.validationState = new ValidationState();
        initializeProperties(this);
        this.validate = this.validate.bind(this);
        ///add volatile views actions
    }  
    validate (){           
        let validationResult = this.validationsManager.validate(this);
        this.validationState.setValidationState(validationResult);
        const isChildrenValid =  this.propertiesManager.validate({parent: this})
        this.validationState.setIsValid(isChildrenValid ? this.isValid : false);
        return this.validationState.isValid         
    };
  };
