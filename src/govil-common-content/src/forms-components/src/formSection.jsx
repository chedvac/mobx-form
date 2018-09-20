import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Header from './header';
import SideToolbar from './sideToolbar';

let closeWidth = '72';
const openWidth = '210';

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
  }
};

// const ContentDiv = style(React.Fragment)(({ theme, props }) => ({
//   root: {
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3,
//     [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: `${props.drawerForContentWidth}px`,
//     width: `calc(100% - ${props.drawerForContentWidth}px)`
//   },
// }));

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
    // const contentStyle = {
    //   [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: `${this.state.drawerForContentWidth}px`,
    //   width: `calc(100% - ${this.state.drawerForContentWidth}px)`,
    // };
    return (
      <React.Fragment>
        <Header toggleToolbar={this.toggleToolbar} />
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

          {/* <ComponentDemo drawerForContentWidth={this.state.drawerForContentWidth} rootStore={rootStore} /> */}
          {/* <ComponentDemoStyled rootStore={rootStore} drawerForContentWidth={this.state.drawerForContentWidth} /> */}
          {/* <ContentDiv drawerForContentWidth={this.state.drawerForContentWidth} classes={classes} > */}
          {/* <div style={contentStyle} className={classes.content}> */}
          {/* { */}
          {/* this.props.children */}
          {/* }
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default FormSection;
