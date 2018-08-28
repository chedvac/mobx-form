import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  //subTitle: theme.typography.subTitle
});

@withStyles(styles)
class BlueButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, children } = this.props;
    return (
      <Button variant="contained" color="primary">
        {children}
      </Button>
    );
  }
}
export default BlueButton;
