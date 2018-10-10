import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TabsNavigation from './TabsNavigation';

export default class TabsRouter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <TabsNavigation routeSettings={this.props.routeSettings} />
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
    );
  }
}
