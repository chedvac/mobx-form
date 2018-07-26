import React from 'react';
import { observer } from 'mobx-react';
import control from './hocs/control';
import TextareaAutosize from 'react-textarea-autosize';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './CSS/Textarea.css';
const styles = theme => ({
  textField: {
    float: 'right',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  label: {
    left: 'unset'
  },
  helperText: {
    'text-align': 'right'
  }
});

@observer
class Textarea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    const { rows = 3, isAutoResize = false, ...props } = this.props || {};
    const ROW_VS_PX = 20.666666666666667;
    const MAX_ROWS = 1000;
    const minHeight = { minHeight: ROW_VS_PX * rows + 'px' };
    return (
      <div>
        <TextField
          {...props}
          multiline
          rows={rows}
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
        />
        {/* <TextareaAutosize
          {...props}
          useCacheForDOMMeasurements
          rows={rows}
          minRows={rows}
          maxRows={isAutoResize ? MAX_ROWS : rows}
          className="textarea-field"
        />
        <span className="pseudoTextArea" style={minHeight}>
          {props.field}
        </span> */}
      </div>
    );
  }
}
export default control(withStyles(styles)(Textarea));
