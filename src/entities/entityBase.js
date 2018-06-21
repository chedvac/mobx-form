import {observable, autorun, action,computed} from "mobx";
import ComplexType from '../core/ComplexType'
import modelProp from '../core/modelProp'
import formObservable from '../core/formObservable'

class EntityBase extends ComplexType{
    constructor(){
        super()

        this.set_dataCode = this.set_dataCode.bind(this);
        this.set_dataText = this.set_dataText.bind(this);
        this.set_EntityBase=this.set_EntityBase.bind(this);
        
    }   
    @modelProp() @formObservable()  dataCode = '';
    @modelProp() @formObservable() dataText = '';


    @action
    set_dataCode(value){
        this.dataCode=value;
    }

    @action
    set_dataText(value){
        this.dataText=value;
    }

    @action
    set_EntityBase(item){
        if(item){
            this.dataCode = item.dataCode;
            this.dataText = item.dataText;
        }
        else{
            this.dataCode = "";
            this.dataText ="";
        }
    } 

}

export default EntityBase;
