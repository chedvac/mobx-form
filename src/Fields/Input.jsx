import React from 'react';
import { observer, reaction } from 'mobx-react';
import control from './hocs/control';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  textField: {
    float: 'right',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  label: {
    left: 'unset',
    'margin-right': '5px'
  },
  helperText: {
    'text-align': 'right'
  }
  // ,
  // input: {
  //   border: '1px solid rgba(0, 0, 0, 0.42)',
  //   'padding-right': '10px',
  //   'border-bottom': 'none'
  // }
});

@withStyles(styles)
@observer
class Input extends React.Component {
  // @reaction(() => this.props.value)
  // fetchData(value) {
  //   console.log('reaction: ', value);
  // };

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, xs, sm, ...props } = this.props;
    return (
      <Grid item xs={xs} sm={sm}>
        <TextField
          {...this.props}
          className={classes.textField}
          margin="normal"
          error={props.message ? true : false}
          helperText={props.message}
          InputLabelProps={{
            className: classes.label
          }}
          FormHelperTextProps={{
            className: classes.helperText
          }}
          // InputProps={{
          //   className: classes.input
          // }}
          inputProps={{
            maxlength: props.maxlength
          }}
        />
      </Grid>
    );
  }
}
export default control(Input);
