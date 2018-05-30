import {observable, autorun, action} from "mobx";
import property from "../../../core/property"
import ComplexType from "../../../core/ComplexType"
import {hebrewName} from '../../../validations/languages'
import {maxlength} from '../../../validations/general'

class TablesTab extends ComplexType{
    constructor(){
        super()
        this.email = ' ';
        this.houseNumber = ' ';
        this.actions ={
            @action set_email:(newValue)=> {
                this.email = newValue
            },
            @action set_houseNumber:(newValue)=> {
                this.houseNumber = newValue
            }
        
        }
    }   
    @property({ validations:[hebrewName(), maxlength({value: 5})]})  email;
    @property() houseNumber;
}
  
export default TablesTab;


