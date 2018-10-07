import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
import toolbarButtons from 'govil-common-content/application-data/src/toolbarStore';
import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/modularViewModel';
import PersonalInformation from './tabs/SimpleFieldsTab/containers/PersonalInformation/PersonalInformation';
import Link from 'reactUiComponents/dialogs/Link';
import dialog from 'reactUiComponents/dialogs/dialog.js';
//import LanguageStore from '../components/language/store'
// import submitAction from '../actions/submit';

import { toJS } from 'mobx';

class RootStore extends ModularViewModel {
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
  async submitForm() {
    // submitAction(this.formInformation.setIsFormSent);
    try {
      await dialog.confirm({
        content: Link,
        title: 'שליחת טופס'
      });
      console.log('resolve');
    } catch (err) {
      console.log('reject');
    }
    // dialog.confirm({
    //   message: 'הטופס נשלח בהצלחה',
    //   title: 'שליחת טופס'
    // });
  }

  async validateForm() {
    const isStoreValid = await this.validate();
    if (isStoreValid) {
      dialog.alert({ content: 'נתוני הטופס תקינים' });
    }
  }
  getStoreAsJSon = () => toJS(this.model.getModel());

  getStoreAsJSon = () => toJS(this.model.getModel());
}

export default RootStore;
