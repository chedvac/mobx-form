import React from 'react';
import Row from 'react-ui-components/structure/row';
import Grid from '@material-ui/core/Grid';
import BlueButton from 'react-ui-components/buttons/BlueButton';
import WhiteButton from 'react-ui-components/buttons/WhiteButton';
import injectSheet from 'react-jss'
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

const styles = theme => ({
  navigateButton: {
    'text-decoration': 'none',
    ...theme.typography.boldText
  },
  hide: { display: 'none' } //theme.typography.hide
});

@injectSheet(styles)
@inject('languageStore')
class NextPrevButtons extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.pathesArray = this.props.routeSettings.map(route => route.path);
    this.texts = {
      back: this.props.languageStore.resourcesProvider({
        hebrew: 'לשלב הקודם',
        english: 'back',
        arabic: 'לשלב הקודם'
      }),
      next: this.props.languageStore.resourcesProvider({
        hebrew: 'לשלב הבא',
        english: 'next',
        arabic: 'לשלב הבא'
      })
    };
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
              {this.texts.back.get()}
            </BlueButton>
          </a>
          <a
            href={this.getNextPath(currentStep)}
            className={`${classes.navigateButton} ${
              this.isLastRoute(currentStep) ? classes.hide : ''
              }`}
          >
            <WhiteButton>{this.texts.next.get()}</WhiteButton>
          </a>
        </Row>
      </Grid>
    );
  }
}
NextPrevButtons.wrappedComponent.propTypes = {
  routeSettings: PropTypes.array.isRequired,
  history: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};
export default NextPrevButtons;
