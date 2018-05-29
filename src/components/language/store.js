import {observable, autorun, action} from "mobx";
import property from "../../core/property"
import ComplexType from "../../core/ComplexType"

class Language extends ComplexType {
    constructor(){
        super()
        const self = this;
        this.model={...this.model,
           @property({validations:[]})
           name :'hebrew'
          
        }
        this.actions = {
            @action
            set_name:(value)=>{
                this.model.name = value;
            }
       
        }
    }
    
}

export default Language;
