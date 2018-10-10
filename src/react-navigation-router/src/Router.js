import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
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
    );
  }
}
Router.propTypes = {
  routeSettings: PropTypes.arrayOf(RouteSettings).isRequired
};
export default Router;
