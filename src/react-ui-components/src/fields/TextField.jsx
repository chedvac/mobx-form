import React from 'react';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import textField from 'mobx-business-components/textField';
import MUTextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = {};

@injectSheet(styles)
@observer
class TextField extends React.Component {
  render() {
    const { xs = '12', sm = '6', lg = '3', ...props } = this.props;
    return (
      <Grid item xs={xs} sm={sm} lg={lg}>
        <MUTextField
          {...this.props}
          variant="outlined"
          margin="dense"
          fullWidth={true}
          error={props.message ? true : false}
          helperText={props.message}
          inputProps={{
            maxlength: props.maxlength
          }}
        />
      </Grid>
    );
  }
}
export default textField(TextField);
