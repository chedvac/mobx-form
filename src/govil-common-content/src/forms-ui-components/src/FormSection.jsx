import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import SideToolbar from './SideToolbar';
import injectSheet from 'react-jss';

let closeWidth = '62';
const openWidth = '220';

const styles = theme => {
  return {
    contentDiv: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative'
    },
    content: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    },
    dir: props => ({
      flexGrow: 1,
      direction: props.direction,
      backgroundColor: '#fff'
    })
  };
};

@injectSheet(styles)
@observer
class FormSection extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    opened: false,
    openedByToolbarButton: false,
    drawerWidth: this.props.theme.isMobile ? '0' : closeWidth,
    drawerForContentWidth: this.props.theme.isMobile ? '0' : closeWidth
  };

  toggleToolbar = () => {
    this.setState({
      opened: !this.state.opened,
      openedByToolbarButton: !this.state.opened,
      drawerWidth: !this.state.opened ? openWidth : closeWidth,
      drawerForContentWidth: !this.state.opened ? openWidth : closeWidth
    });
  };

  openToolbarOnOver = () => {
    if (!this.state.opened) {
      this.setState({ opened: true, drawerWidth: openWidth });
    }
  };

  closeToolbarOnOut = () => {
    if (!this.state.openedByToolbarButton) {
      this.setState({ opened: false, drawerWidth: closeWidth });
    }
  };

  render() {
    const { classes, rootStore, theme } = this.props;
    closeWidth = theme.isMobile ? '0' : '72';

    return (
      <div className={classes.dir}>
        <Header
          toggleToolbar={this.toggleToolbar}
          direction={theme.direction}
        />
        <div className={classes.contentDiv}>
          <SideToolbar
            direction={theme.direction}
            width={this.state.drawerWidth}
            toolbarButtonsStore={rootStore.toolbarButtons}
            opened={this.state.opened}
            openToolbarOnOver={this.openToolbarOnOver}
            closeToolbarOnOut={this.closeToolbarOnOut}
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default FormSection;