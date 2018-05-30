import {observable} from "mobx"
import validationsManagerFactory from "../validations/validationsManager"

export default class ComplexType {
    
    constructor (settings = {}) {
      this.isValid = true;
      this.message = '';
      this.propertiesManager = {}
      var self = this
      this.model={
        } 
      ///add volatile views actions
      this.initialProperty = this.initialProperty.bind(this);
      this.validate = this.validate.bind(this);
      this.getDeepModel = this.getDeepModel.bind(this);
      this.getModel = this.getModel.bind(this);
      this.getPureModel = this.getPureModel.bind(this);
      this.map = this.map.bind(this);
      this.reset = this.reset.bind(this);
      this.validationsManager = new validationsManagerFactory(settings.validations || []);
      
    }
   
    getDeepModel (prop) {
       return prop.getPureModel ? prop.getPureModel() : prop.getValue();
       
    }   
    initialProperty (propertyName, value, actions) {
        if(typeof value === 'object'){
            actions = {validate: value.validate, map: value.map, reset:value.reset, validationsManager: value.validationsManager}
        }
        this.model[propertyName] = value;
        this.propertiesManager[propertyName] = {
            ...actions,
            @observable message: '',
            @observable isValid: ''
        }
        
     }
   
   applyChildAction (action){//todo private
       var propertiesManager = this.propertiesManager;
       for (var property in propertiesManager) {
           if (propertiesManager.hasOwnProperty(property)) {
               propertiesManager[property][action]()
           }
       }
       
   }
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
    // setModel : function(){
       //     type.model
       //     //map
       // },
 
    validate (){
           var self = this;
           const validateChildren =()=>{
              
               let childrenValid = true;
               const propertiesManager = self.propertiesManager
               Object.keys(propertiesManager).forEach(function(key){
                    if(!propertiesManager[key].validate(self)){
                        console.log(key,'not valid')                    
                        childrenValid = false 
                    }
               })
               return childrenValid
           }  

         
           const validateSelf=()=>{
            let validationResult = self.validationsManager.validate(self);
            if(!validationResult.isValid){
                self.message = validationResult.message 
                self.isValid = false
               }else{
                self.message = ""
                self.isValid = true
               }
            return self.isValid

           }
           
          this.isValid =  validateSelf()
          validateChildren()?this.isValid = this.isValid:this.isValid=false;

           return this.isValid
           
       };
       //TODO fromSnapshot , to Snapshot
       map (){

       };
       reset (){
           this.applyChildAction('reset')
       }
   
  }

