import { observable, action } from 'mobx';

const ButtonTypes = Object.freeze({
  OK: 'ok',
  CANCEL: 'cancel'
});
class Dialog {
  constructor() {
    this.defaultSettings = {
      title: '',
      content: '',
      buttons: []
    };
    this.settings = this.defaultSettings;
  }
  @observable
  isOpen = false;

  _getButtonsByType = params => {
    const { type, resolve, reject } = params;
    const okButton = {
      type: ButtonTypes.OK,
      click: () => {
        resolve();
        this.close();
      }
    };
    const cancelButton = {
      type: ButtonTypes.CANCEL,
      click: () => {
        reject();
        this.close();
      }
    };
    const buttonsByType = {
      alert: {
        buttons: { ok: okButton }
      },
      confirm: {
        buttons: {
          ok: okButton,
          cancel: cancelButton
        }
      }
    };

    return buttonsByType[type];
  };

  _mergeSettings = (buttonsSettings, settings) =>
    Object.assign({}, this.defaultSettings, buttonsSettings, settings);

  _openByType = type => (settings = {}) => {
    const self = this;
    const dialogPromise = new Promise((resolve, reject) => {
      const buttonsSettings = self._getButtonsByType({
        type,
        resolve,
        reject
      });
      const dialogSettings = self._mergeSettings(buttonsSettings, settings);

      self.open(dialogSettings);
    });
    return dialogPromise;
  };

  @action
  open = settings => {
    this.settings = settings;
    this.isOpen = true;
  };

  @action
  close = () => {
    this.isOpen = false;
  };

  alert = this._openByType('alert');
  confirm = this._openByType('confirm');
}
export default new Dialog();
