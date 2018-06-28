import {observable, autorun, action} from "mobx";
import formObservable from "../../../core/formObservable"
import modelProp from "../../../core/modelProp"

import ComplexType from "../../../core/ComplexType"
import {hebrewName} from '../../../validations/text'
import {maxlength} from '../../../validations/basic'

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
    @modelProp() @formObservable({ validations:[hebrewName(), maxlength({value: 5})]})  email = '';
    @modelProp() @formObservable() houseNumber = '';

}
  
export default TablesTab;


