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
        this.message='';
        this.isValid=true;
      
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
            self.validationsManager = self.validationsManager || new validationsManagerFactory(self.validations || []);
            let validationResult = self.validationsManager.validate(self);
            if(!validationResult.isValid){
                console.log(self,'not valid') 
                self.message = validationResult.message 
                self.isValid = false
               }else{
                self.message = ""
                self.isValid = true
               }
            return self.isValid

        }           
        validateSelf()
        const isChildrenValid = this.propertiesManager.validate(this);
        this.isValid = isChildrenValid || this.isValid;
        return this.isValid         
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

