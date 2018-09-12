import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Header from './header';
import SideToolbar from './sideToolbar'

const styles = theme => {
  return {
    content: {
      width: 1,
      //width: `calc(100% - ${theme.drawerWidth}px)`,
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
    }
  }
};

@withStyles(styles)
@observer
class FormSection extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    opened: false,
    openedByToolbarButton: false
  };

  toggleToolbar = () => {
    this.setState({ opened: !this.state.opened, openedByToolbarButton: !this.state.opened });
  };

  openToolbarOnOver = () => {
    if (!this.state.opened) {
      this.setState({ opened: true });
    }
  };

  closeToolbarOnOut = () => {
    if (!this.state.openedByToolbarButton) {
      this.setState({ opened: false });
    }
  };
  render() {
    const { classes, rootStore } = this.props;
    return (
      <React.Fragment>
        <Header toggleToolbar={this.toggleToolbar} />
        <SideToolbar
          toolbarButtonsStore={rootStore.toolbarButtons}
          opened={this.state.opened}
          openToolbarOnOver={this.openToolbarOnOver}
          closeToolbarOnOut={this.closeToolbarOnOut}
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
