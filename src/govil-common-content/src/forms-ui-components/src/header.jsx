import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import injectSheet from 'react-jss'
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => { };

@injectSheet(styles)
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, toggleToolbar } = this.props;
    return (
      <AppBar position="static" className={classNames(classes.appBar)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleToolbar}
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
