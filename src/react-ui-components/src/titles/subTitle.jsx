import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  subTitle: theme.typography.subTitle
});

@withStyles(styles)
class SubTitle extends React.Component {
  render() {
    const { classes, children } = this.props;
    return <Typography className={classes.subTitle}>{children}</Typography>;
  }
}
export default SubTitle;
