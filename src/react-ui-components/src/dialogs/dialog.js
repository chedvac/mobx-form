import { observable, action } from 'mobx';

class Dialog {
  constructor() {
    this.state = observable({
      isOpen: false,
      message: '',
      title: '',
      buttons: []
    });
    this.prevFocus;
    this.defaultButtonsTexts = {
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
    };
    this.defaultSettings = {
      isOpen: false,
      modal: true,
      title: '',
      message: '',
      autoOpen: true,
      width: 300,
      resizable: false,
      close: () => this.prevFocus.focus(),
      buttons: [],
      dialogClass: 'dialog-component top-zindex position-fixed',
      closeText: '',
      draggable: false
    };
    this.okButton = () => ({
      text: this.texts.ok,
      click: () => {
        this.promiseResolve();
        this.close();
      }
    });
    this.promiseReject;
    this.promiseResolve;
    this.dialogTypes = () => ({
      alert: {
        buttons: [this.okButton()]
      },
      confirm: {
        buttons: [
          this.okButton(),
          {
            text: this.texts.cancel,
            click: () => {
              this.promiseReject();
              this.close();
            }
          }
        ]
      }
    });
  }

  @action
  open = settings => {
    this.prevFocus = document.activeElement;
    const { message, title, buttons } = settings;

    this.state.buttons = buttons;
    this.state.message = message;
    this.state.title = title;
    this.state.isOpen = true;
  };
  close = () => {
    this.state.isOpen = false;
    this.prevFocus.focus();
  };
  dialogFactory = type => {
    return (settings = {}) => {
      const self = this;
      const promise = new Promise(function(resolve, reject) {
        self.promiseResolve = resolve;
        self.promiseReject = reject;
      });
      const buttonTexts = Object.assign(
        this.defaultButtonsTexts,
        settings.buttonTexts
      );
      //texts = ko.multiLanguageObservable({ resource: buttonTexts });
      this.texts = buttonTexts.hebrew;
      const innerDefaultSettings = this.dialogTypes[type];
      const factorySettings = Object.assign(innerDefaultSettings, settings);
      this.open(factorySettings);
      return promise; //deffer.promise;
    };
  };
  alert = this.dialogFactory('alert');
  confirm = this.dialogFactory('confirm');
}
export default new Dialog();
