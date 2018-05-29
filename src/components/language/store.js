import {observable, autorun, action} from "mobx";
import property from "../../core/property"
import ComplexType from '../../core/ComplexType'


class Language  extends ComplexType{
    constructor(){
        super();
    }
    @property()
    name ='hebrew'
        
    @action
    set_name=(value)=>{
        this.model.name = value;
    }
    
}

export default Language;
