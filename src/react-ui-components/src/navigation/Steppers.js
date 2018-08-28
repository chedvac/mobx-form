import React from 'react';
import Link from 'reactNavigationRouter/Link';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  stepLabel: {
    width: '40px',
    height: '40px'
  }
});

@withStyles(styles)
export default class Steppers extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  state = {
    activeStep: 0
  };
  render() {
    return (
      <Stepper>
        {this.props.routeSettings.map((route, index) => (
          <Step key={route.name} {...this.props}>
            <Link to={route.path}>
              <StepLabel className="stepLabel" />
            </Link>
            <span>{route.name}</span>
          </Step>
        ))}
      </Stepper>
    );
  }
}
