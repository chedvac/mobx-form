import {observable, autorun, action} from "mobx";
import formObservable from "../../core/formObservable"
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
    @formObservable() name ='hebrew'

}
    
export default Language;
