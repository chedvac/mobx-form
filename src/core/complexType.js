export default class ComplexType {
    
    constructor () {
      this.isValid = true;
      this.message = '';
      this.propertiesManager = {}
      var self = this
      this.model={
        getParent: function(){return self}
        } 
      ///add volatile views actions
      this.validate = this.validate.bind(this);
      this.getDeepModel = this.getDeepModel.bind(this);
      this.getModel = this.getModel.bind(this);
      this.getPureModel = this.getPureModel.bind(this);
      this.map = this.map.bind(this);
      this.reset = this.reset.bind(this);
    }
   // get propertiesManager
    getDeepModel (prop) {
       return prop.getPureModel ? prop.getPureModel() : prop.getValue();
       
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
               // const failedChildValidation = Object.values(propertiesManager).find(function(obj){
               //     obj.validationsManager.validate()
               // })
               let childrenValid = true;
               const model = self.getModel()
               Object.keys(model).forEach(function(key){
                   if(model[key].validate){
                       model[key].validate()
                   } else if(self.propertiesManager[key].validationsManager.validate){
                        self.propertiesManager[key].validationsManager.validate()
                   }
               })
               // if(failedChildValidation){
               //     this.isValid = false
               // }
           }  

           // const validateChildren =()=>{
           //     let childrenValid = true;
           //     var propertiesManager = target.propertiesManager;
           //     for (var property in propertiesManager) {
           //         if (propertiesManager.hasOwnProperty(property)) {
           //             !propertiesManager[property].validationsManager.validate()?
           //             childrenValid = false : childrenValid = childrenValid
           //         }
           //     }
           //     this.isValid = false
           //     return childrenValid
           // }
           const validateItself=()=>{
               var failedValidation= this.validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value)=== false) )
               if(!failedValidation){
                   this.message = ""
                   this.isValid = true
               }

               this.message = failedValidation.message 
               this.isValid = false

           }
           
          // validateItself()
          validateChildren()
           return this.isValid
           
       };
       //TODO fromSnapshot , to Snapshot
       map (){

       };
       reset (){
           this.applyChildAction('reset')
       }
   
  }
