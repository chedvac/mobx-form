import React from 'react';
import Row from 'reactUiComponents/structure/row';
import Grid from '@material-ui/core/Grid';
import BlueButton from 'reactUiComponents/buttons/blueButton';
import WhiteButton from 'reactUiComponents/buttons/whiteButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  navigateButton: {
    'text-decoration': 'none',
    ...theme.typography.boldText
  },
  hide: theme.typography.hide
});

@withStyles(styles)
class NextPrevButtons extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.pathesArray = this.props.routeSettings.map(route => route.path);
  }

  getCurrentStep() {
    return this.pathesArray.indexOf(this.props.history.path);
  }
  getNextPath(currentStep) {
    return this.pathesArray[currentStep + 1] || '/';
  }
  getBackPath(currentStep) {
    return this.pathesArray[currentStep - 1] || '/';
  }
  isFirstRoute(currentStep) {
    return currentStep === 0;
  }
  isLastRoute(currentStep) {
    return this.pathesArray.length === currentStep + 1;
  }
  render() {
    const { classes } = this.props;
    const currentStep = this.getCurrentStep();
    return (
      <Grid>
        <Row>
          <a
            href={this.getBackPath(currentStep)}
            className={`${classes.navigateButton} ${
              this.isFirstRoute(currentStep) ? classes.hide : ''
            }`}
          >
            <BlueButton variant="outlined" className={classes.button}>
              לשלב הקודם
            </BlueButton>
          </a>
          <a
            href={this.getNextPath(currentStep)}
            className={`${classes.navigateButton} ${
              this.isLastRoute(currentStep) ? classes.hide : ''
            }`}
          >
            <WhiteButton>לשלב הבא</WhiteButton>
          </a>
        </Row>
      </Grid>
    );
  }
}
export default NextPrevButtons;
