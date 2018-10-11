import { observable, action } from 'mobx';

class Dialog {
  constructor() {
    this.defaultSettings = {
      buttonsTexts: {
        hebrew: {
          ok: 'אישור',
          cancel: 'ביטול'
        },
        arabic: {
          ok: 'التأكيد',
          cancel: 'الغاء'
        },
        english: {
          ok: 'OK',
          cancel: 'Cancel'
        }
      },
      state: {
        isOpen: false,
        title: '',
        content: '',
        buttons: []
      }
    };
    this.state = observable(this.defaultSettings.state);
  }

  _getButtonsTexts = buttonTexts => {
    const buttonResources = Object.assign(
      this.defaultSettings.buttonsTexts,
      buttonTexts
    );
    //texts = ko.multiLanguageObservable({ resource: texts });
    return buttonResources.hebrew;
  };
  _getButtonsByType = params => {
    const { type, texts, resolve, reject } = params;
    const okButton = {
      text: texts.ok,
      click: () => {
        resolve();
        this.close();
      }
    };
    const cancelButton = {
      text: texts.cancel,
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
    Object.assign({}, this.defaultSettings.state, buttonsSettings, settings);

  _openByType = type => (settings = {}) => {
    const self = this;
    const dialogPromise = new Promise((resolve, reject) => {
      const texts = self._getButtonsTexts(settings.buttonTexts);
      const buttonsSettings = self._getButtonsByType({
        type,
        texts,
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
    settings.isOpen = true;
    Object.assign(this.state, settings);
  };

  @action
  close = () => {
    this.state.isOpen = false;
  };

  alert = this._openByType('alert');
  confirm = this._openByType('confirm');
}
export default new Dialog();
