import {observable, autorun, action} from "mobx";
import property from "../../../core/property"
import complexType from "../../../core/complexType"

//import addressValidation from './../../../types/addressTypes';

//@complexType({validations:[]})
class TablesTab {
    constructor(){
        
    this.model={
        // email: types.union(types.undefined, addressValidation.email),
        // houseNumber: types.union(types.undefined, addressValidation.houseNumber)
        
        @property
        email: "",
        @property        
        houseNumber:""
    }
    this.actions ={
        updateEmail:(newValue)=> {
           // self.email = newValue
        },
        updateHouseNumber:(newValue)=> {
            //self.houseNumber = newValue
        }
    
      }
}
}
  
export default TablesTab;


