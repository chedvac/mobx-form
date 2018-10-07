import React from 'react';
import Link from 'reactNavigationRouter/Link';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from '@material-ui/core/styles';
import customTheme from 'reactUiComponents/themes/customTheme';

const styles = theme => ({
  blueTitle: {
    ...theme.typography.blueTitle,
    marginTop: '-30px'
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
    this.props.history.listen(location => {
      this.handleStep(location);
    });
  }
  state = {
    activeStep: 0
  };

  handleStep = location => {
    const step = this.props.routeSettings.findIndex(
      route => route.path === location.pathname
    );
    this.setState({
      activeStep: step
    });
  };

  render() {
    const { activeStep } = this.state;
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={customSteppersTheme}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {this.props.routeSettings.map((route, index) => (
            <Step key={route.name} {...this.props}>
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
export default withRouter(Steppers);
