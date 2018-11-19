import { observable, action } from 'mobx';

const ButtonTypes = Object.freeze({
  OK: 'ok',
  CANCEL: 'cancel'
});
class Dialog {
  constructor() {
    this.defaultSettings = {
      isOpen: false,
      title: '',
      content: '',
      buttons: {},
      onClose: this.close,
      fullWidth: true,
      maxWidth: 'sm'
    };
    this.settings = observable(this.defaultSettings);
  }

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

  _mergeWithDefaultSettings = settings =>
    Object.assign({}, this.defaultSettings, settings);

  _openByType = type => (settings = {}) => {
    const self = this;
    const dialogPromise = new Promise((resolve, reject) => {
      const buttonsSettings = self._getButtonsByType({
        type,
        resolve,
        reject
      });
      const dialogSettings = Object.assign(buttonsSettings, settings);

      self.open(dialogSettings);
    });
    return dialogPromise;
  };

  @action
  open = settings => {
    delete this.settings.buttonsTexts;
    Object.assign(this.settings, this._mergeWithDefaultSettings(settings));
    this.settings.isOpen = true;
  };

  @action
  close = () => {
    this.settings.isOpen = false;
  };

  alert = this._openByType('alert');
  confirm = this._openByType('confirm');
}
export default new Dialog();
