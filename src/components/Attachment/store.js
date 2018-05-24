import BaseControlDecorator  from "../../core/BaseControlDecorator"
import Field from '../../core/Field'
import {observable, autorun, action} from "mobx";
import BaseTextareaAutoSize from "../../Fields/BaseTextarea";

@complexType()
export class Attachment:IContainer {
    
    constructor(){
        this.model={
            @property<Number> size 
            @property<String>(validations[fileName])name
            @property(Number)guid
        }
        this.views = {//todo: rename
            fullName = ()=>{
                return this.firstName + this.lastName
            }
        }
        this.actions = {
            callServer
        }
    }
}
export default Attachment;
