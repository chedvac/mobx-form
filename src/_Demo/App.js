import React, { Component } from 'react';
import './App.css';
import RootStore from './rootStore';
import ComponentsDemo from './ComponentsDemo';
import {observer, Provider} from 'mobx-react';

@observer

class App extends Component {
  render() {
    const rootStore=new RootStore();
    const applicationData = rootStore.model.applicationData
    return (
      <Provider  applicationData = {applicationData}>
        <div className="App">
          <header >
          </header>
          <ComponentsDemo rootStore={rootStore}/>
        </div>
      </Provider>
    );
  }
}

export default App;
