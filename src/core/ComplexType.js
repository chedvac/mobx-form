import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"
import initializeInstance from './initializeComplexType'
import PropertiesManager from './PropertiesManager'
export default class ComplexType {
    @observable isValid = true;
    @observable message = '';
    constructor () {
        this.propertiesManager = new PropertiesManager();
        this.model={} 
        //   this.message='';
        //   this.isValid=true;
      
        ///add volatile views actions
        this.initialProperty = this.initialProperty.bind(this);
        this.validate = this.validate.bind(this);
        this.getDeepModel = this.getDeepModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getPureModel = this.getPureModel.bind(this);
        // this.reset = this.reset.bind(this);
        initializeInstance(this);
    }
   
    getDeepModel (prop) {
       return prop.getPureModel ? prop.getPureModel() : prop.getValue();
       
    }   

    initialProperty (propertyName, settings) {
        this.model[propertyName] = settings.ref;
        this.propertiesManager.setProperty(propertyName, settings);   
    }
      
    applyChildAction (action){//todo private
       this.propertiesManager.applyChildAction(action);
    };

    validate (){
        var self = this;     
        const validateSelf=()=>{
            let childrenIsValid = true;
            const propertiesManager = self.propertiesManager.properties;
            if (propertiesManager) {
              Object.keys(propertiesManager).forEach(function(key) {
                if (!propertiesManager[key].validate(self, self.model[key])) {
                  childrenIsValid = false;
                }
              });
            }
            return childrenIsValid;

        }           
        validateSelf()
        const isChildrenValid = this.propertiesManager.validate(this);
        this.isValid = isChildrenValid || this.isValid;
        return this.isValid  
        // let validationResult = this.validationsManager.validate(this);
        // this.message = validationResult.message;
        // const childrenIsValid = validateChildren();
        // this.isValid = validationResult.isValid ? childrenIsValid : validationResult.isValid;
    
        // return this.isValid;       
    };

    getModel(){
        return this.model
    };

    getPureModel (){
        var pureModel = {};
        var model = this.model;
        for (var prop in model) {
            if (model.hasOwnProperty(prop) && !model[prop].ignore) {
                pureModel[prop] = this.getDeepModel(model[prop]);
            }
        }
        return pureModel;
    };

    // reset (){
    //     this.applyChildAction('reset');
    // }
   
  
}
