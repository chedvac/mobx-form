import {observable, autorun, action} from "mobx";
import property from "../../core/property"
import complexType from "../../core/complexType"

@complexType()
class Language {
    constructor(){
        const self = this;
        this.model={
            getParent: function(){return self},
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
