import page from 'page';

import React from 'react';
import RouteSettingsType from 'react-navigation-router/RouteSettings';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
class Router extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { routeSettings, base } = this.props;
    if (base) page.base(base);
    routeSettings.forEach(route => {
      this.setRoute(route.path, route.component);
    });
  }
  state = { component: null, context: { path: '/' } };
  setRoute(path, Component) {
    page(path, ctx => {
      this.setState({
        context: ctx,
        component: <Component ctx={ctx} page={page} path={path} />
      });
    });
  }
  componentDidMount() {
    page.start(this.props.pageOptions || { hashbang: false });
    page.redirect(this.props.routeSettings[0].path);
  }
  render() {
    const TopNavigation = this.props.topNavigation;
    const BottomNavigation = this.props.bottomNavigation;
    const cleanProps = omit(this.props, ['topNavigation', 'bottomNavigation']);
    return (
      <div>
        {TopNavigation && (
          <TopNavigation history={this.state.context} {...cleanProps} />
        )}
        {this.state.component}
        {BottomNavigation && (
          <BottomNavigation history={this.state.context} {...cleanProps} />
        )}
      </div>
    );
  }
}
Router.propTypes = {
  routeSettings: PropTypes.array.isRequired,
  pageOptions: PropTypes.object,
  base: PropTypes.string
};
export default Router;
