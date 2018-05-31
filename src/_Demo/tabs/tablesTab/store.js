import {observable, autorun, action} from "mobx";
import property from "../../../core/property"
import ComplexType from "../../../core/ComplexType"
import {hebrewName} from '../../../validations/languages'
import {maxlength} from '../../../validations/general'

class TablesTab extends ComplexType{
    constructor(){
        super()
        // this.email = "yaelp@gov.il"
        this.actions ={
            @action set_email:(newValue)=> {
                this.email = newValue
            },
            @action set_houseNumber:(newValue)=> {
                this.houseNumber = newValue
            }
        
        }
    }   
    @observable age = 15;
    @property({ validations:[hebrewName(), maxlength({value: 5})]})  email = '';
    @property() houseNumber = '';

}
  
export default TablesTab;


