import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import './App.css';
import RootStore from './rootStore';
import languageStore from 'govil-common-content/forms-business-components/src/language';
import injectSheet, { ThemeProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import FormSection from 'govil-common-content/forms-ui-components/src/formSection';
import customTheme from 'src/customTheme';
import Dialog from 'react-ui-components/dialog';
import dialog from 'mobx-business-components/dialog';

import ComponentDemo from './componentsDemo';

const styles = {};

@injectSheet(styles)
@observer
class App extends Component {

  constructor() {
    super();
    this.rootStore = new RootStore();
    languageStore.setAvaliableLanguages(['hebrew', 'english']);
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <ThemeProvider theme={{ direction: languageStore.direction }} >
          <React.Fragment>
            <CssBaseline />
            <Provider languageStore={languageStore} >
              <Grid container>
                <Dialog settings={dialog.settings} isOpen={dialog.isOpen} />
                <FormSection rootStore={this.rootStore} direction={customTheme.direction}>
                  <ComponentDemo rootStore={this.rootStore} />
                </FormSection>
              </Grid>
            </Provider>
          </React.Fragment>
        </ThemeProvider >
      </ThemeProvider >
    );
  }
}

export default App;
