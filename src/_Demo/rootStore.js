import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
import LanguageStore from '../components/language/store'
import property from "../core/property"
import ComplexType from '../core/ComplexType'
//import model from '../core/model'
//import externalized from '../core/externalized'
import PersonalInformation from './tabs/SimpleFieldsTab/containers/PersonalInformation/store'
import {toJS} from 'mobx'


class RootStore extends ComplexType {
    constructor() {
        super()
        this.model={...this.model,
           //  @model(this) model:{
                
                formData:{       
                    //   @externalized()       
                    simpleFieldsTab: new SimpleFieldsTab(),
                    tablesTab: new TablesTab()
                },
                applicationData:{
                    formLanguage: new LanguageStore()
                }
            
             }
        }
        
    
    getStoreAsJSon=()=>{
        return toJS(this.model.getModel())
    }

}

export default RootStore