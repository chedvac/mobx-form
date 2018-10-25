import React from 'react';
import Router from 'react-navigation-router/router.jsx';
import Steppers from './steppers';
import NextPrevButtons from './nextPrevButtons';

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
