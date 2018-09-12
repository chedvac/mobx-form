import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
import toolbarButtons from 'govil-common-content/application-data/src/toolbarStore'
import modelMember from 'mobx-vm/modelMember';
import ComplexType from 'mobx-vm/complexType';

//import LanguageStore from '../components/language/store'
import complexType from 'mobx-vm/complexType';

// import submitAction from '../actions/submit';

import { toJS } from 'mobx';

class RootStore extends ComplexType {
  constructor() {
    super();
    this.simpleFieldsTab = new SimpleFieldsTab();
    this.tablesTab = new TablesTab();
    this.toolbarButtons = toolbarButtons;
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  @modelMember()
  simpleFieldsTab;
  @modelMember()
  tablesTab;
  submitForm() {
    // submitAction(this.formInformation.set_isFormSent);
  }

  validateForm() {
    const isStoreValid = this.validate();
    if (isStoreValid) {
      alert('נתוני הטופס תקינים');
    }
  }
  getStoreAsJSon = () => {
    return toJS(this.model.getModel());
  };

  getStoreAsJSon = () => {
    return toJS(this.model.getModel());
  };
}

export default RootStore;
