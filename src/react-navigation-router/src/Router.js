import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import PropTypes from 'prop-types';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const AboveElements = this.props.aboveElements;
    const BelowElements = this.props.belowElements;

    return (
      <BrowserRouter>
        <div>
          {AboveElements && <AboveElements {...this.props} />}
          <Route
            path="/"
            exact
            render={() => (
              <Redirect
                to={this.props.routeSettings[0].path}
                isByFirstRedirect={true}
              />
            )}
          />
          {this.props.routeSettings.map((tab, index) => (
            <Route key={index} path={tab.path} component={tab.component} />
          ))}
          {BelowElements && <BelowElements {...this.props} />}
        </div>
      </BrowserRouter>
    );
  }
}
Router.propTypes = {
  routeSettings: PropTypes.arrayOf(RouteSettings)
};
export default Router;
