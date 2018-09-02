import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';

import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/modularViewModel';

//import LanguageStore from '../components/language/store'
// import submitAction from '../actions/submit';

import { toJS } from 'mobx';

class RootStore extends ModularViewModel {
  constructor() {
    super();
    this.simpleFieldsTab = new SimpleFieldsTab();
    this.tablesTab = new TablesTab();
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

  async validateForm() {
    const isStoreValid = await this.validate();
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
