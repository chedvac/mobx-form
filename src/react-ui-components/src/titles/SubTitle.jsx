import React from 'react';
import injectSheet from 'react-jss'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  subTitle: theme.typography.subTitle
});

@injectSheet(styles)
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
