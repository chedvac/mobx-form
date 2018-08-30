import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ComponentsDemo from '_Demo/componentsDemo';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Header from './header';
import SideToolbar from './sideToolbar'
import classNames from 'classnames';

const styles = theme => ({
  root1: {
    flexGrow: 1,
    height: '100%',
    zIndex: 65001,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  formSection: {
    padding: theme.spacing.unit * 5
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
});

@withStyles(styles)
@observer
class FormSection extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    openedByAppBar: false
  };
  handleDrawer = () => {
    const openVal = this.state.open;
    console.log(`openVal: ${openVal}`);
    this.setState({ open: !openVal, openedByAppBar: !openVal });
  };
  handleDrawerOpenByFocus = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    }
  };
  handleDrawerCloseByFocus = () => {
    if (!this.state.openedByAppBar) {
      this.setState({ open: false });
    }
  };
  render() {
    const { classes } = this.props;
    const isMobile = true;
    const actionsList = ['validateForm', 'submitForm'];
    return (
      <div>
        <Header handleDrawer={this.handleDrawer} />
        <SideToolbar
          open={this.state.open}
          handleDrawerOpenByFocus={this.handleDrawerOpenByFocus}
          handleDrawerCloseByFocus={this.handleDrawerCloseByFocus}
          actionsList={actionsList}
        />
        <ComponentsDemo {...this.props} />
      </div>
    );
  }
}

export default FormSection;
