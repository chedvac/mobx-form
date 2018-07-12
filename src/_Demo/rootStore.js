import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
//import LanguageStore from '../components/language/store'
import modelProp from '../core/modelProp';
import ComplexType from '../core/ComplexType';
//import model from '../core/model'
//import externalized from '../core/externalized'
import submitAction from '../actions/submit';

import { toJS } from 'mobx';

class RootStore extends ComplexType {
  constructor() {
    super();
    this.simpleFieldsTab = new SimpleFieldsTab();
    this.tablesTab = new TablesTab();
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.initializeComplexProperties();
  }
  @modelProp() simpleFieldsTab;
  @modelProp() tablesTab;
  submitForm() {
    submitAction(this.formInformation.set_isFormSent);
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
  
  getStoreAsJSon = () => {
    return toJS(this.model.getModel());
  };
}

export default RootStore;
