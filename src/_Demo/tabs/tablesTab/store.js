import {observable, autorun, action} from "mobx";
import property from "../../../core/property"
import ComplexType from "../../../core/complexType"
import {hebrewName} from '../../../validations/languages'
import {maxlength} from '../../../validations/general'
//import addressValidation from './../../../types/addressTypes';

//@complexType({validations:[]})
class TablesTab extends ComplexType{
    constructor(){
        super()
    this.model={
        // email: types.union(types.undefined, addressValidation.email),
        // houseNumber: types.union(types.undefined, addressValidation.houseNumber)
        
       
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
@property({  validations:[hebrewName(), maxlength({value: 5})],})  email;
@property() houseNumber;
}
  
export default TablesTab;


