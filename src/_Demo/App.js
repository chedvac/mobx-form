import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { autorun } from 'mobx';
import './App.css';
import RootStore from './rootStore';
import languageStore from 'govil-common-content/forms-business-components/src/language';
import injectSheet, { ThemeProvider } from 'react-jss'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import FormSection from 'govil-common-content/forms-ui-components/src/formSection';
import customTheme from 'reactUiComponents/themes/customTheme';
import Dialog from 'reactUiComponents/dialogs/dialog.jsx';
import ComponentDemo from './componentsDemo';

const styles = {};

@injectSheet(styles)
@observer
class App extends Component {

  constructor() {
    super();
    //this.rootStore = new RootStore();
    languageStore.setAvaliableLanguages(['hebrew', 'english']);
  }

  // state = {
  //   direction: languageStore.direction
  // }
  // componentWillMount() {
  //   this.rootStore = new RootStore();
  //   this.applicationData = {};
  //   languageStore.setAvaliableLanguages(['hebrew', 'english']);
  //   // customTheme.direction = languageStore.direction;
  // }

  render() {
    // const newDirection = languageStore.direction;
    // if (newDirection !== this.state.direction) {
    //   customTheme.direction = newDirection;
    //   this.setState({ direction: newDirection });
    // }

    const rootStore = new RootStore();
    customTheme.direction = languageStore.direction;

    return (
      <ThemeProvider theme={customTheme}>
        <React.Fragment>
          <CssBaseline />
          <Provider languageStore={languageStore} >
            <Grid container>
              <Dialog />
              <FormSection rootStore={rootStore} direction={customTheme.direction}>
                <ComponentDemo rootStore={rootStore} />
              </FormSection>
            </Grid>
          </Provider>
        </React.Fragment>
      </ThemeProvider >
    );
  }
}

export default App;
