import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Header from './header';
import SideToolbar from './sideToolbar';
import injectSheet from 'react-jss';

const styles = theme => {
  return {
    contentDiv: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
    },
    content: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    },
    dir: {
      flexGrow: 1,
      direction: theme.direction,
      backgroundColor: '#fff'
    }
  };
};

@injectSheet(styles)
@observer
class FormSection extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      opened: false,
      openedByToolbarButton: false
    };
  }

  toggleToolbar = () => {
    this.setState({
      opened: !this.state.opened,
      openedByToolbarButton: !this.state.opened
    });
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
      <div className={classes.dir}>
        <Header
          toggleToolbar={this.toggleToolbar}
        />
        <div className={classes.contentDiv}>
          <SideToolbar
            toolbarButtonsStore={rootStore.toolbarButtons}
            opened={this.state.opened}
            openToolbarOnOver={this.openToolbarOnOver}
            closeToolbarOnOut={this.closeToolbarOnOut}
          />
          {
            this.props.children
          }
        </div>
      </div >
    );
  }
}

export default FormSection;
