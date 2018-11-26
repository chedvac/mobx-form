import React from 'react';
import injectSheet from 'react-jss'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  row: { marginTop: theme.spacing.unit * 2 }
});

@injectSheet(styles)
class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      spacing = 16,
      justify = 'space-around',
      children
    } = this.props;
    return (
      <Grid
        className={classes.row}
        spacing={spacing}
        container
        direction="row"
        justify={justify}
      >
        {children}
      </Grid>
    );
  }
}
export default Row;
