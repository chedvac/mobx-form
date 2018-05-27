import property from "../../core/property"
import complexType from "../../core/complexType"

//@complexType
class Language {
    constructor(){
        this.model={
           // @property
           name :'hebrew'
        }
        this.actions={
            setLanguage:(newName)=>{
                this.name = newName
            }
        }
    }
}

export default Language;
