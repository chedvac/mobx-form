import page from 'page';

import React from 'react';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import PropTypes from 'prop-types';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.routeSettings.forEach(route => {
      this.setRoute(route.path, route.component);
    });
    page.start({ hashbang: false });
    page.redirect(this.props.routeSettings[0].path);
  }
  state = { component: null, context: {} };
  setRoute(path, Component) {
    page(path, ctx => {
      this.setState({
        context: ctx,
        component: <Component ctx={ctx} page={page} path={path} />
      });
    });
  }

  render() {
    const TopNavigation = this.props.topNavigation;
    const BottomNavigation = this.props.bottomNavigation;
    return (
      <div>
        {TopNavigation && (
          <TopNavigation history={this.state.context} {...this.props} />
        )}
        {this.state.component}
        {BottomNavigation && (
          <BottomNavigation history={this.state.context} {...this.props} />
        )}
      </div>
    );
  }
}
Router.propTypes = {
  routeSettings: PropTypes.arrayOf(RouteSettings).isRequired
};
export default Router;
