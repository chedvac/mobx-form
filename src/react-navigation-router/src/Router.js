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
    return (
      <BrowserRouter>
        <div>
          {this.props.children
            ? React.cloneElement(this.props.children, { ...this.props })
            : ''}
          <Route
            path="/"
            exact
            component={this.props.routeSettings[0].component}
          />
          {this.props.routeSettings.map((tab, index) => (
            <Route key={index} path={tab.path} component={tab.component} />
          ))}
          <Redirect to={this.props.routeSettings[0].component} />
        </div>
      </BrowserRouter>
    );
  }
}
// Router.propTypes = {
//   routeSettings: PropTypes.arrayOf(RouteSettings)
// };
export default Router;
