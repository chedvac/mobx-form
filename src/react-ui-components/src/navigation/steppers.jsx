import React from 'react';
import Link from 'react-navigation-router/link';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from '@material-ui/core/styles';
import customTheme from 'react-ui-components/themes/customTheme';

const styles = theme => ({
  blueTitle: {
    ...theme.typography.blueTitle,
    marginTop: '-14px'
  }
});

const customSteppersTheme = () => {
  let from = 'right',
    to = 'left';
  if (customTheme.direction === 'ltr') {
    from = 'left';
    to = 'right';
  }
  return createMuiTheme({
    ...customTheme,
    overrides: {
      MuiStepConnector: {
        alternativeLabel: {
          top: '20px',
          [to]: 'calc(-50% + 20px)',
          [from]: 'calc(50% + 20px)'
        }
      },
      MuiSvgIcon: {
        root: {
          fontSize: '40px'
        }
      },
      MuiStep: { horizontal: { paddingLeft: 0, paddingRight: 0 } },
      MuiStepIcon: {
        text: {
          fontSize: '10px'
        }
      }
    }
  });
};

@withStyles(styles)
class Steppers extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  handleStep = currentPath => {
    const step = this.props.routeSettings.findIndex(
      route => route.path === currentPath
    );
    return step === -1 ? 0 : step;
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={customSteppersTheme}>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={this.handleStep(this.props.history.path)}
        >
          {this.props.routeSettings.map((route, index) => (
            <Step key={route.name}>
              <Link to={route.path}>
                <StepButton />
              </Link>
              <Typography className={classes.blueTitle}>
                {route.name}
              </Typography>
            </Step>
          ))}
        </Stepper>
      </MuiThemeProvider>
    );
  }
}
Steppers.propTypes = {
  routeSettings: PropTypes.array.isRequired, //*Of(PropTypes.instanceOf(RouteSettings1))*/
  history: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};
export default Steppers;
