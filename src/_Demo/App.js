import React, { Component } from 'react';
import './App.css';
import RootStore from './rootStore';
import LanguageStore from '../components/language/store';
import ComponentsDemo from './ComponentsDemo';
import { observer, Provider } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: 14
  }
  // ,overrides: {
  //   MuiStepIcon: {
  //     root: {
  //       color: 'red'
  //     }
  //   }
  // }
});

@observer
class App extends Component {
  render() {
    const rootStore = new RootStore();
    window.rootStore = rootStore;
    const applicationData = {
      formLanguage: new LanguageStore()
    };
    window.applicationData = applicationData;
    console.log('applicationData', applicationData);
    return (
      <MuiThemeProvider theme={theme}>
        <Provider applicationData={applicationData}>
          <div className="App">
            <header />
            <ComponentsDemo rootStore={rootStore} />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
