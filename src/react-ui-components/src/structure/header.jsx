import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => {
  return {
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    appBar: {
      zIndex: 65001,
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    }
  }
};

@withStyles(styles)
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    debugger;
    const { classes, handleDrawer } = this.props;
    return (
      <AppBar position="static" className={classNames(classes.appBar)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawer}
            className={classNames(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit">טופס דוגמא</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
