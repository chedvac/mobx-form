import {observable, autorun, action} from "mobx";
import property from "../../core/property"
import ComplexType from "../../core/ComplexType"

class Language extends ComplexType {
    constructor(){
        super()
        const self = this;

        
        this.actions = {
            @action set_name:(value)=>{
                this.model.name = value;
            }
       
        }
    }
    @property({validations:[]}) name ='hebrew'

}
    
export default Language;
