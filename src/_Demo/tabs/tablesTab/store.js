import {observable, autorun, action} from "mobx";
import property from "../../../core/property"
import ComplexType from "../../../core/ComplexType"

//import addressValidation from './../../../types/addressTypes';


class TablesTab extends ComplexType{
    constructor(){
        let model;
        super(model);
    model={
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


