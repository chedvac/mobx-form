import Router from 'reactNavigationRouter/router';
import Steppers from 'reactUiComponents/navigation/steppers';
import NextPrevButtons from 'reactUiComponents/navigation/nextPrevButtons';
import Navigation from 'reactUiComponents/navigation/navigation';
jest.mock('reactNavigationRouter/router', () => 'mock-widget');

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
