import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RouteSettings from 'react-navigation-router/RouteSettings';
import PropTypes from 'prop-types';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const AboveContentElements = this.props.aboveContentElements;
    const BelowContentElements = this.props.belowContentElements;

    return (
      <BrowserRouter>
        <div>
          {AboveContentElements && <AboveContentElements {...this.props} />}
          <Route
            path="/"
            exact
            render={() => (
              <Redirect
                to={this.props.routeSettings[0].path}
                isFirstRedirect={true}
              />
            )}
          />
          {this.props.routeSettings.map((tab, index) => (
            <Route key={index} path={tab.path} component={tab.component} />
          ))}
          {BelowContentElements && <BelowContentElements {...this.props} />}
        </div>
      </BrowserRouter>
    );
  }
}
Router.propTypes = {
  routeSettings: PropTypes.arrayOf(RouteSettings).isRequired
};
export default Router;
