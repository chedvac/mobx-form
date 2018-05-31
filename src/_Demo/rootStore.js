import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
//import LanguageStore from '../components/language/store'
import property from "../core/property"
import ComplexType from '../core/ComplexType'
//import model from '../core/model'
//import externalized from '../core/externalized'
import PersonalInformation from './tabs/SimpleFieldsTab/containers/PersonalInformation/store'
import {toJS} from 'mobx'


class RootStore extends ComplexType {
    constructor() {
        super()  
        this.simpleFieldsTab = new SimpleFieldsTab();
        this.tablesTab = new TablesTab();
        this.initialProperty('simpleFieldsTab',this.simpleFieldsTab);   
        this.initialProperty('tablesTab',this.tablesTab);       
        this.validateForm = this.validateForm.bind(this);
    }
        
    validateForm(){
        const isStoreValid = this.validate()
        if(isStoreValid){
            alert('נתוני הטופס תקינים')
        }
    }
    getStoreAsJSon=()=>{
        return toJS(this.model.getModel())
    }

}

export default RootStore