import React from 'react';
import { observer } from 'mobx-react';
import control from 'mobx-business-components/control';
import injectSheet from 'react-jss'
import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  // field: {
  //   // float: 'right',
  //   // marginLeft: theme.spacing.unit,
  //   // marginRight: theme.spacing.unit,
  //   // width: '100%',
  //   // display: 'flex',
  // },
  // label: {
  //   // left: 'unset',
  //   // 'margin-right': '5px'
  // },
  // helperText: {
  //   // 'text-align': 'right'
  // },
  // formControl: {
  //   // margin: theme.spacing.unit * 3,
  // },
  // group: {
  //   // margin: `${theme.spacing.unit}px 0`,
  // }
});

@injectSheet(styles)
@observer
class RadioButtonsGroup extends React.Component {

  render() {
    const {
      xs = 12,
      sm = 6,
      lg = 3,
      radioButtonsDetails,
      label,
      onChange,
      onBlur
    } = this.props;
    return (
      <Grid item xs={xs} sm={sm} lg={lg}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          {...this.props}
          aria-label={label}
          name="gender"
          onChange={e => {
            onChange(e);
            onBlur(e);
          }}
        >
          {
            radioButtonsDetails.map((radioButtonDetails) =>
              <FormControlLabel
                key={radioButtonDetails.value}
                value={radioButtonDetails.value}
                control={<Radio color='primary' />}
                label={radioButtonDetails.label}
              />
            )
          }
        </RadioGroup>
      </Grid>
    );
  }
}
export default control(RadioButtonsGroup);
