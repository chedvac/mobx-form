export const  validate = (parent,self,name,value) => {
  //  const value = newValue ? newValue : descriptor.get();
  if(self.propertiesManaget){

  }
    let validationResult = self.validationsManager.validate(self,value);
    if(self.propertiesManaget){
        self.message = validationResult.message
        self.isValid = validationResult.isValid
    }else{
        parent.propertiesManager[name].isValid = false
        parent.propertiesManager[name].message = validationResult.message;
    }
    
    return self.isValid
}
