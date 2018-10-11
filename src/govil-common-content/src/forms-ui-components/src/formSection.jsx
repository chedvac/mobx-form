import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Header from './header';
import SideToolbar from './sideToolbar';
<<<<<<< HEAD:src/govil-common-content/src/forms-components/src/formSection.jsx

let closeWidth = '72';
const openWidth = '210';
=======
import LanguagesMenu from 'govil-common-content/forms-ui-components/src/languagesMenu';
>>>>>>> b2b6e1e73fb8ab86cd1f16605f2c625438e337cd:src/govil-common-content/src/forms-ui-components/src/formSection.jsx

const styles = theme => {
  return {
    contentDiv: {
      display: 'flex',
      position: 'relative',
    },
    content: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    }
  };
};

@withStyles(styles, { withTheme: true })
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
<<<<<<< HEAD:src/govil-common-content/src/forms-components/src/formSection.jsx
      openedByToolbarButton: !this.state.opened,
      drawerWidth: !this.state.opened ? openWidth : closeWidth,
      drawerForContentWidth: !this.state.opened ? openWidth : closeWidth
=======
      openedByToolbarButton: !this.state.opened
>>>>>>> b2b6e1e73fb8ab86cd1f16605f2c625438e337cd:src/govil-common-content/src/forms-ui-components/src/formSection.jsx
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
      <React.Fragment>
        <Header toggleToolbar={this.toggleToolbar} />
<<<<<<< HEAD:src/govil-common-content/src/forms-components/src/formSection.jsx
        <div className={classes.contentDiv}>
          <SideToolbar
            width={this.state.drawerWidth}
            toolbarButtonsStore={rootStore.toolbarButtons}
            opened={this.state.opened}
            openToolbarOnOver={this.openToolbarOnOver}
            closeToolbarOnOut={this.closeToolbarOnOut}
          />
          {
            React.cloneElement(this.props.children, { drawerForContentWidth: this.state.drawerForContentWidth })
          }

        </div>
=======
        <SideToolbar
          toolbarButtonsStore={rootStore.toolbarButtons}
          opened={this.state.opened}
          openToolbarOnOver={this.openToolbarOnOver}
          closeToolbarOnOut={this.closeToolbarOnOut}
        />
        <div className={classes.content}>{this.props.children}</div>
>>>>>>> b2b6e1e73fb8ab86cd1f16605f2c625438e337cd:src/govil-common-content/src/forms-ui-components/src/formSection.jsx
      </React.Fragment>
    );
  }
}

export default FormSection;
