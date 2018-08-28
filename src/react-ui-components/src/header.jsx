import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
// const styles = theme => ({
//   header: {
//     ...theme.typography.title,
//     flexGrow: 1
//   }
// });

@withStyles(styles)
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit">טופס דוגמא</Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

export default Header;
