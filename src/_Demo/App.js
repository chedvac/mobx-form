import React, { Component } from 'react';
import './App.css';
import RootStore from './rootStore';
import ComponentsDemo from './ComponentsDemo';
import {observer, Provider,inject} from 'mobx-react';

@observer

class App extends Component {
constructor(props){
  super(props);
  this.store =new RootStore();
}
  
  render() {
    const ComponentsDemoApp=   inject(stores => 
      ({
          personalInformation: this.store.simpleFieldsTab
      })
  )(ComponentsDemo);
  
    return (
     
        <div className="App">
          <header >
          </header>
          
{
 
}
          <ComponentsDemoApp />
        </div>
      
    );
  }
}

export default App;
