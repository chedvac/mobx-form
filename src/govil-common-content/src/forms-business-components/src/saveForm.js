import { observable, action } from 'mobx';
import dialog from 'mobx-business-components/dialog';
import OptionsScreen from 'govil-common-content/forms-ui-components/src/saveForm/optionsScreen';
import EmailScreen from '../../forms-ui-components/src/saveForm/emailScreen';
import ModularViewModel from 'mobx-vm/modularViewModel';
import validateable from 'mobx-vm/validateable';
import { email } from 'validations/rules/address';
import request from 'utils/serviceRequest';
import languageStore from 'govil-common-content/forms-business-components/src/language';
import EndProcessScreen from 'govil-common-content/forms-ui-components/src/saveForm/endProcessScreen';
const endpoint = 'http://gov.forms.local/MW/forms/Data/'; //'/MW/forms/Data/';

class SaveForm extends ModularViewModel {
  constructor() {
    super();
    this.sendMail = this.sendMail.bind(this);
  }
  @observable
  @validateable({ validations: [email()] })
  email = 'chedva@gov.il';
  @observable
  @validateable({ validations: [email()] })
  emailValidation = '';
  @observable
  @validateable([
    /*mobile()*/
  ])
  cellNumber = '';
  @observable
  @validateable([
    /*mobile()*/
  ])
  cellNumberValidation = '';

  @action.bound
  setEmail(value) {
    this.email = value;
  }
  @action.bound
  setEmailValidation(value) {
    this.emailValidation = value;
  }
  @action.bound
  setCellNumber(value) {
    this.email = value;
  }
  @action.bound
  setCellNumberValidation(value) {
    this.emailValidation = value;
  }
  async openSaveModal() {
    //await validationExcludeRequire
    dialog.open({ content: OptionsScreen });
  }
  async _isEmailFieldsValid() {
    return (
      (await this.validateables.email.validate(this.email)) &&
      (await this.validateables.emailValidation.validate(this.emailValidation))
    );
  }
  _handleSaveResponse(response) {
    // formInformation.formParams.process.processID = response.processID;
    //this.reset();
    dialog.open({ content: EndProcessScreen });
  }
  async _saveRequest(settings) {
    // console.log(
    //   '-------------------languageStore.getShortName()',
    //   languageStore.getShortName()
    // );
    console.log(
      '-------------------languageStore.getShortName',
      languageStore.getShortName
    );
    // loader.open(labels().pending);
    const settingsRequest = {
      url: endpoint,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        processID: '', //formInformation.formParams.process.processID,
        requestID: '', //formInformation.formParams.process.requestID,
        formData: JSON.parse('{}' /*rootStore.dataModelSaver()*/),
        attachments: [], //filesManager.attachedFilesIds(),
        language: languageStore.getShortName,
        address: settings.data,
        sendMethod: settings.type
      })
    };
    console.log('------------------settingsRequest', settingsRequest);
    const response = await request(settingsRequest);
    this._handleSaveResponse(response);
    //loader.close();
    // MWResponse.defaultBehavior({ response, callback: handleSaveResponse });
  }
  async _waitFilesUploading() {
    //loader.open(labels().waitFilesUploading);
    // await filesManager.allUploadsCompleted();
    // loader.close();
  }
  async _invokeSaveEvent(settings) {
    //rootStore.map()
    // await this._waitFilesUploading();
    this._saveRequest(settings);
  }
  async sendMail() {
    if (!(await this._isEmailFieldsValid())) {
      return;
    }
    this._invokeSaveEvent({
      data: this.email,
      type: 'email'
    });
  }
}
export default new SaveForm();
