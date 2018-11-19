import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
import toolbarButtons from 'govil-common-content/application-data/src/toolbarStore';
import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/modularViewModel';
import PersonalInformation from './tabs/SimpleFieldsTab/containers/PersonalInformation/PersonalInformation';
import Link from './Link';
import dialog from 'mobx-business-components/dialog';
import { toolbarButtonsNames } from 'govil-common-content/forms-ui-components/src/toolbarButtons';
import examples from 'govil-common-content/application-data/src/DemoData';

//import LanguageStore from '../components/language/store'
// import submitAction from '../actions/submit';

import { toJS } from 'mobx';

class RootStore extends ModularViewModel {
  constructor() {
    super();
    this.simpleFieldsTab = new SimpleFieldsTab();
    this.tablesTab = new TablesTab();
    this.toolbarButtons = new toolbarButtons({
      [toolbarButtonsNames.submit]: examples.obsVal
    });
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
        title: 'שליחת טופס',
        buttonsTexts: {
          ok: {
            hebrew: 'כן',
            english: 'Yes',
            arabic: 'التأكيد'
          },
          cancel: {
            hebrew: 'לא',
            english: 'No',
            arabic: 'الغاء'
          }
        }
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
      dialog.alert({ content: 'נתוני הטופס תקינים', maxWidth: 'xs' });
    }
  }
  getStoreAsJSon = () => toJS(this.model.getModel());

  getStoreAsJSon = () => toJS(this.model.getModel());
}

export default RootStore;
