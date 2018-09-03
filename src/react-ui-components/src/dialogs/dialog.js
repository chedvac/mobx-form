import { observable, action } from 'mobx';

class Dialog {
  constructor() {
    this.state = {
      open: false,
      message: '',
      title: '',
      buttons: []
    };
  }

  // @action
  open = settings => {
    const { message, title } = settings;
    this.state.open = true;
    this.state.message = message;
    this.state.title = title;
  };
  close = () => {
    this.state.open = false;
  };
  // alertSettings
}
export default new Dialog();
