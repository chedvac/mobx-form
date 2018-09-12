import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Row from 'reactUiComponents/core/row';
import Grid from '@material-ui/core/Grid';
import BlueButton from 'reactUiComponents/core/blueButton';
import WhiteButton from 'reactUiComponents/core/whiteButton';
import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from '@material-ui/core/styles';
import customTheme from 'reactUiComponents/CSS/customTheme';

const styles = theme => ({
  navigateButton: {
    'text-decoration': 'none',
    ...theme.typography.boldText
  }
});

@withStyles(styles)
class NextPrevButtons extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getNextPath() {
    const currentIndex = this.props.pathesArray.indexOf(
      this.props.history.location.pathname
    );
    return this.props.pathesArray[currentIndex + 1]
      ? this.props.pathesArray[currentIndex + 1]
      : '/';
  }
  getBackPath() {
    const currentIndex = this.props.pathesArray.indexOf(
      this.props.history.location.pathname
    );
    return this.props.pathesArray[currentIndex - 1]
      ? this.props.pathesArray[currentIndex - 1]
      : '/';
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Row>
          <Link to={this.getBackPath()} className={classes.navigateButton}>
            <BlueButton variant="outlined" className={classes.button}>
              לשלב הקודם
            </BlueButton>
          </Link>
          <Link to={this.getNextPath()} className={classes.navigateButton}>
            <WhiteButton>לשלב הבא</WhiteButton>
          </Link>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(NextPrevButtons);
