import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
//import LanguageStore from '../components/language/store'
import modelProp from "../core/modelProp"
import ComplexType from '../core/ComplexType'
//import model from '../core/model'
//import externalized from '../core/externalized'
import submitAction from "../actions/submit";
import FormInformation from "../core/formInformation";
import PersonalInformation from './tabs/SimpleFieldsTab/containers/PersonalInformation/store'
import {toJS} from 'mobx'
import MWRequestDefaultBehavior from '../networking/mwWrapper'

class RootStore extends ComplexType {
    constructor() {
        super()  
        this.formInformation = new FormInformation();
        this.simpleFieldsTab = new SimpleFieldsTab();
        this.tablesTab = new TablesTab();
        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    @modelProp() formInformation;
    @modelProp() simpleFieldsTab;
    @modelProp() tablesTab;
    submitForm(){
        submitAction(this.formInformation.set_isFormSent);
    };

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