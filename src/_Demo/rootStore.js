import SimpleFieldsTab from './tabs/SimpleFieldsTab/store';
import TablesTab from './tabs/tablesTab/store';
import toolbarButtons from 'govil-common-content/application-data/src/ToolbarStore';
import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/ModularViewModel';
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
  }
  @modelMember()
  simpleFieldsTab;
  @modelMember()
  tablesTab;

  getStoreAsJSon = () => toJS(this.model.getModel());

  getStoreAsJSon = () => toJS(this.model.getModel());
}

export default RootStore;
