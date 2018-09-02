import React from 'react';
import Router from 'reactNavigationRouter/Router';
import Steppers from './Steppers';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <Router {...this.props}>
        <Steppers />
      </Router>
    );
  }
}
