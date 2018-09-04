import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Header from './header';
import SideToolbar from './sideToolbar'

const styles = theme => ({
  content: {
    width: 1,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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
    const actionsList = ['validateForm', 'submitForm', 'print', 'saveAsPDF', 'attachments', 'save'];
    return (
      <React.Fragment>
        <Header handleDrawer={this.handleDrawer} />
        <SideToolbar
          open={this.state.open}
          handleDrawerOpenByFocus={this.handleDrawerOpenByFocus}
          handleDrawerCloseByFocus={this.handleDrawerCloseByFocus}
          actionsList={actionsList}
        />
        <div className={classes.content}>
          {
            this.props.children
          }
        </div>
      </React.Fragment>
    );
  }
}

export default FormSection;
