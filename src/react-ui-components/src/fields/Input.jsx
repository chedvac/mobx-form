import React from 'react';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import textField from 'mobx-business-components/textField';
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

@injectSheet(styles)
@observer
class Input extends React.Component {
  render() {
    const {
      classes,
      languageStore,
      xs = 12,
      sm = 6,
      lg = 3,
      ...props
    } = this.props;
    return (
      <Grid item xs={xs} sm={sm} lg={lg}>
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
export default textField(Input);
