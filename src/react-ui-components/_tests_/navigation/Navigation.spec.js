import Router from 'react-navigation-router/Router';
import Steppers from 'react-ui-components/navigation/Steppers';
import NextPrevButtons from 'react-ui-components/navigation/NextPrevButtons';
import Navigation from 'react-ui-components/navigation/Navigation';
jest.mock('react-navigation-router/Router', () => 'mock-widget');

import React from 'react';
import { shallow } from 'enzyme';
let wrapper;
describe('<Navigation />', () => {
  test('Router is render', () => {
    wrapper = shallow(<Navigation />);
    expect(wrapper.find(Router)).toHaveLength(1);
  });
  test('Router is render with Navigation props', () => {
    wrapper = shallow(<Navigation prop1={'prop1'} prop2={'prop2'} />);
    expect(wrapper.find(Router).props().prop1).toBe('prop1');
    expect(wrapper.find(Router).props().prop2).toBe('prop2');
  });
  test('pass Steppers as topNavigation props', () => {
    wrapper = shallow(<Navigation prop1={'prop1'} prop2={'prop2'} />);
    expect(wrapper.find(Router).props().topNavigation).toBe(Steppers);
  });
  test('pass Steppers as topNavigation props', () => {
    wrapper = shallow(<Navigation prop1={'prop1'} prop2={'prop2'} />);
    expect(wrapper.find(Router).props().bottomNavigation).toBe(NextPrevButtons);
  });
});
