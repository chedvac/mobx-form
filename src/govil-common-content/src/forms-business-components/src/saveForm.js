import { observable, action } from 'mobx';
import dialog from 'mobx-business-components/dialog';
import OptionsScreen from 'govil-common-content/forms-ui-components/src/saveForm/optionsScreen';

class SaveForm {
  constructor() {
    this.defaultSettings = {
      title: '',
      content: '',
      buttons: []
    };
    this.settings = this.defaultSettings;
  }

  async openSaveModal() {
    //await validationExcludeRequire
    dialog.open({ content: OptionsScreen });
  }
}
export default new SaveForm();
