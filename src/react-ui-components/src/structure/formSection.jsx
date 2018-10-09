import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const styles = theme => ({
  formSection: {
    padding: theme.spacing.unit * 5
  }
});

@withStyles(styles)
@observer
class FormSection extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} className={classes.formSection}>
        {React.cloneElement(this.props.children, { ...this.props })}
      </Grid>
    );
  }
}

export default FormSection;
