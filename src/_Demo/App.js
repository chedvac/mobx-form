import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import RootStore from './rootStore';
import languageStore from 'govil-common-content/forms-business-components/src/language';
import injectSheet, { ThemeProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FormSection from 'govil-common-content/forms-ui-components/src/FormSection';
import customTheme from 'src/customTheme';
import Dialog from 'react-ui-components/Dialog';
import dialog from 'mobx-business-components/dialog';

import ComponentDemo from './componentsDemo';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const generateClassName = createGenerateClassName();

const styles = {};

@injectSheet(styles)
@observer
class App extends Component {
  constructor() {
    super();
    this.rootStore = new RootStore();
    window.rootStore = this.rootStore;
    languageStore.setAvaliableLanguages(['hebrew', 'english']);
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <ThemeProvider theme={{ direction: languageStore.direction }}>
          <React.Fragment>
            <CssBaseline />
            <Provider languageStore={languageStore}>
              <Grid container>
                <Dialog settings={dialog.settings} isOpen={dialog.isOpen} />
                <FormSection rootStore={this.rootStore}>
                  <JssProvider jss={jss} generateClassName={generateClassName}>
                    <ComponentDemo rootStore={this.rootStore} />
                  </JssProvider>
                </FormSection>
              </Grid>
            </Provider>
          </React.Fragment>
        </ThemeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
