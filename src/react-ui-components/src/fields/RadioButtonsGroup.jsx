import React from 'react';
import { observer } from 'mobx-react';
import control from 'mobx-business-components/control';
import injectSheet from 'react-jss'
import { enableUniqueIds } from 'react-html-id';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({

});

@injectSheet(styles)
@observer
class RadioButtonsGroup extends React.Component {

  constructor(props) {
    super(props);
    enableUniqueIds(this);
  }

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
                control={<Radio id={this.lastUniqueId()} color='primary' />}
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
