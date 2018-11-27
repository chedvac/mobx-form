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
    headerMargin: {
      position: 'absolute',
      [theme.breakpoints.down('sm')]: {
        [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: '20%',
      },
      [theme.breakpoints.up('md')]: {
        [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: '10%',
      },
      [theme.breakpoints.up('lg')]: {
        [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: '10%',
      },
      [theme.breakpoints.up('xl')]: {
        [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: '15%',
      },
      [`margin${theme.direction === 'rtl' ? 'Left' : 'Right'}`]: 0
    },
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
