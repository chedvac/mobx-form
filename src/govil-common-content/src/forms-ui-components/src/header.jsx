import React from 'react';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss'
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => {
  return {
    headerMargin: props => ({
      position: 'absolute',
      [`margin${props.direction === 'rtl' ? 'Right' : 'Left'}`]: `${theme.sideSpace}%`,
      [`margin${props.direction === 'rtl' ? 'Left' : 'Right'}`]: 0
    }),
    toolbarPadding: {
      paddingRight: theme.spacing.unit / 2,
      paddingLeft: theme.spacing.unit / 2
    }
  }
};

@injectSheet(styles)
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, toggleToolbar } = this.props;
    return (
      <AppBar position="static" >
        <Toolbar className={classNames(classes.toolbarPadding)}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleToolbar}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.headerMargin} color="inherit">טופס דוגמא</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
