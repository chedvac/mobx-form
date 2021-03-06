import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ToolbarButton from 'govil-common-content/forms-ui-components/src/ToolbarButton';
import { toolbarButtonsObject } from './toolbarButtons';
import fp from 'lodash/fp';
import injectSheet from 'react-jss';

const styles = theme => {
  return {
    drawerPaper: props => ({
      display: 'flex',
      position: 'absolute',
      whiteSpace: 'nowrap',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      left: theme.direction === 'rtl' ? 'auto' : '0',
      right: theme.direction === 'rtl' ? '0' : 'auto',
      width: props.opened ? 220 : 62
    }),
    drawerPaperClose: {
      [theme.breakpoints.down('sm')]: {
        display: 'none !important'
      },
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9
      }
    },
    'ic-language': {
      '&:before': {
        content: '"\\61"'
      }
    },
    'ic-validateForm': {
      '&:before': {
        content: '"\\70"'
      }
    },
    'ic-submit': {
      '&:before': {
        content: '"\\6c"'
      }
    },
    'ic-print': {
      '&:before': {
        content: '"\\7a"'
      }
    },
    'ic-saveAsPDF': {
      '&:before': {
        content: '"\\79"'
      }
    },
    'ic-attachments': {
      '&:before': {
        content: '"\\6a"'
      }
    },
    'ic-save': {
      '&:before': {
        content: '"\\42"'
      }
    }
  };
};

@injectSheet(styles)
@observer
class SideToolbar extends React.Component {
  render() {
    const {
      classes,
      opened,
      openToolbarOnOver,
      closeToolbarOnOut,
      toolbarButtonsStore
    } = this.props;
    return (
      <Drawer
        onMouseEnter={() => {
          openToolbarOnOver();
        }}
        onMouseLeave={() => {
          closeToolbarOnOut();
        }}
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !opened && classes.drawerPaperClose
          )
        }}
        opened={opened.toString()}
      >
        <Divider />
        {fp
          .entriesIn(toolbarButtonsObject)
          .map(toolbarButton =>
            toolbarButtonsStore.toolbarButtonsList[toolbarButton[0]] ? (
              <ToolbarButton
                key={toolbarButton[0]}
                buttonText={toolbarButton[1].buttonText.hebrew}
                className={classes[toolbarButton[1].className]}
                buttonAction={toolbarButton[1].action}
                isToolbarOpened={opened}
                Popup={toolbarButton[1].popup}
              />
            ) : (
              ''
            )
          )}
      </Drawer>
    );
  }
}

export default SideToolbar;
