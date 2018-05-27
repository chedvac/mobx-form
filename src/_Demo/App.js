import React, { Component } from 'react';
import './App.css';
import RootStore from './rootStore';
import ComponentsDemo from './ComponentsDemo';
import {observer, Provider} from 'mobx-react';

@observer

class App extends Component {
  render() {
    return (
      <Provider rootStore={new RootStore()}>
        <div className="App">
          <header >
          </header>
          <ComponentsDemo />
        </div>
      </Provider>
    );
  }
}

export default App;
