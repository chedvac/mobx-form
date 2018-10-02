import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { autorun } from 'mobx';
import './App.css';
import RootStore from './rootStore';
import languageStore from 'govil-common-content/forms-business-components/src/language';

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';

import FormSection from 'govil-common-content/forms-ui-components/src/formSection';
import customTheme from 'react-ui-components/themes/customTheme';

import ComponentDemo from './componentsDemo';

const styles = {
  root: {
    flexGrow: 1,
    direction: 'rtl',
    backgroundColor: '#fff'
  }
};

@withStyles(styles)
@observer
class App extends Component {
  render() {
    const { classes } = this.props;
    const rootStore = new RootStore();
    window.rootStore = rootStore;
    languageStore.setAvaliableLanguges(['hebrew', 'english']);
    const applicationData = {
      formLanguage: languageStore
    };
    // autorun(() => {
    //   customTheme.direction = applicationData.formLanguage.isHebrew
    //     ? 'rtl'
    //     : 'ltr';
    // });
    window.applicationData = applicationData;
    return (
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <Provider applicationData={applicationData}>
          <Grid container className={classes.root}>
            <FormSection rootStore={rootStore}>
              <ComponentDemo rootStore={rootStore} />
            </FormSection>
          </Grid>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
