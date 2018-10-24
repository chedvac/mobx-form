import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Row from 'react-ui-components/structure/row';
import Grid from '@material-ui/core/Grid';
import BlueButton from 'react-ui-components/buttons/blueButton';
import WhiteButton from 'react-ui-components/buttons/whiteButton';
import injectSheet from 'react-jss'

const styles = theme => ({
  navigateButton: {
    'text-decoration': 'none',
    ...theme.typography.boldText
  },
  hide: theme.typography.hide
});

@injectSheet(styles)
class NextPrevButtons extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.pathesArray = this.props.routeSettings.map(route => route.path);
    this.props.history.listen(location => {
      this.saveCurrentStep(location);
    });
  }
  state = {
    currentStep: 0
  };

  saveCurrentStep = location => {
    const currentStep = this.pathesArray.indexOf(
      this.props.history.location.pathname
    );
    this.setState({
      currentStep: currentStep,
      prevStep: currentStep - 1,
      nextStep: currentStep + 1
    });
  };
  getNextPath() {
    return this.pathesArray[this.state.nextStep] || '/';
  }
  getBackPath() {
    return this.pathesArray[this.state.prevStep] || '/';
  }
  isFirstRoute() {
    return this.state.currentStep === 0;
  }
  isLastRoute() {
    return this.pathesArray.length === this.state.nextStep;
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Row justify='space-between'>
          <Link
            to={this.getBackPath()}
            className={`${classes.navigateButton} ${
              this.isFirstRoute() ? classes.hide : ''
              }`}
          >
            <BlueButton variant="outlined" className={classes.button}>
              לשלב הקודם
            </BlueButton>
          </Link>
          <Link
            to={this.getNextPath()}
            className={`${classes.navigateButton} ${
              this.isLastRoute() ? classes.hide : ''
              }`}
          >
            <WhiteButton>לשלב הבא</WhiteButton>
          </Link>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(NextPrevButtons);
