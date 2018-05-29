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
       //todo : move to external
       getValidation(key){
        var self = this;
        const model = self.getModel()
        if(model[key].validate){
            return model[key].validate
        } else if(self.propertiesManager.hasOwnProperty(key)){
            return self.propertiesManager[key].validationsManager.validate
        }
        return;
       }
       validate (){
           var self = this;
           const validateChildren =()=>{
              
               let childrenValid = true;
              
               const model = self.getModel()
               Object.keys(model).forEach(function(key){
                console.log(key)
                   let isChildValid=true;
                   const validation = self.getValidation(key)
                   if(validation){
                    isChildValid = validation(model[key])//??
                    if(!isChildValid){
                        childrenValid = false 
                       }
                   }
               })
               return childrenValid
              
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
          this.isValid = validateChildren()
         
           return this.isValid
           
       };
       //TODO fromSnapshot , to Snapshot
       map (){

       };
       reset (){
           this.applyChildAction('reset')
       }
   
  }
