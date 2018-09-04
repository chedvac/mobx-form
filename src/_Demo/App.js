import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import './App.css';
import RootStore from './rootStore';
import LanguageStore from '../components/language/store';

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import FormSection from 'react-ui-components/structure/formSection';
import FormHeader from 'react-ui-components/structure/header';
import customTheme from 'react-ui-components/themes/customTheme';

import ComponentDemo from './componentsDemo';

const styles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'rtl',
    backgroundColor: '#fff'
  }
});

@withStyles(styles)
@observer
class App extends Component {
  render() {
    const { classes } = this.props;
    const rootStore = new RootStore();
    window.rootStore = rootStore;
    const applicationData = {
      formLanguage: new LanguageStore()
    };
    window.applicationData = applicationData;
    console.log('applicationData', applicationData);
    return (
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <Provider applicationData={applicationData}>
          <Grid container className={classes.root}>
            {/* <FormHeader /> */}
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
