class Dialog {
  constructor() {
    // this.state = jest.fn();
    this.state = {
      isOpen: false,
      title: 'Mock Title',
      content: 'Mock Message',
      buttons: []
    };
  }
}

export default new Dialog();
