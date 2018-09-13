import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
  return {
    subTitle: theme.typography.subTitle
  };
};

@withStyles(styles)
class SubTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, children } = this.props;
    return <Typography className={classes.subTitle}>{children}</Typography>;
  }
}
export default SubTitle;
