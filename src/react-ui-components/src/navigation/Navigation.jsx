import React from 'react';
import Router from 'react-navigation-router/Router';
import Steppers from './Steppers';
import NextPrevButtons from './NextPrevButtons';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <Router
        {...this.props}
        topNavigation={Steppers}
        bottomNavigation={NextPrevButtons}
      />
    );
  }
}
