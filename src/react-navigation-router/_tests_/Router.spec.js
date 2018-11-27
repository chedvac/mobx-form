import Router from 'react-navigation-router/Router';
import React from 'react';
import RouteSettings from 'react-navigation-router/RouteSettings';
import { shallow } from 'enzyme';
import page from 'page';
jest.mock('page');

const TopNavigation = props => <div />;
const BottomNavigation = props => <div />;
const Component = props => <div className={'first-componenet'} />;
const Component1 = props => <div className={'second-componenet'} />;

const routeSettingsArray = [
  new RouteSettings({
    name: 'לשדות רגילים',
    path: '/SimpleFields',
    component: Component
  }),
  new RouteSettings({
    name: 'טבלאות',
    path: '/Tables',
    component: Component1
  })
];
beforeEach(() => {
  page.mockClear();
});
describe('<Router />', () => {
  describe('props', () => {
    describe('routeSettings', () => {
      beforeEach(() => {
        console.error = jest.fn();
      });
      test('is require', () => {
        expect(() => {
          shallow(<Router />);
        }).toThrow();
      });
      test('should be array', () => {
        expect(() => {
          shallow(<Router routeSettings={routeSettingsArray[0]} />);
        }).toThrow();
      });
      test('should be array of RouteSettings', () => {
        // expect(() => {
        //   shallow(<Router routeSettings={[1, 2]} />);
        // }).toThrow();
        const wrapper = shallow(<Router routeSettings={routeSettingsArray} />);
        expect(wrapper).toBeDefined();
      });
    });
    describe('TopNavigation', () => {
      test('render component if passed', () => {
        const wrapper = shallow(
          <Router
            topNavigation={TopNavigation}
            routeSettings={routeSettingsArray}
          />
        );
        expect(wrapper.find(TopNavigation)).toHaveLength(1);
      });
      test('not render component if not passed', () => {
        const wrapper = shallow(<Router routeSettings={routeSettingsArray} />);
        expect(wrapper.find(TopNavigation)).toHaveLength(0);
      });
    });
    describe('BottomNavigation', () => {
      test('render component if passed', () => {
        const wrapper = shallow(
          <Router
            bottomNavigation={BottomNavigation}
            routeSettings={routeSettingsArray}
          />
        );
        expect(wrapper.find(BottomNavigation)).toHaveLength(1);
      });
      test('not render component if not passed', () => {
        const wrapper = shallow(<Router routeSettings={routeSettingsArray} />);
        expect(wrapper.find(BottomNavigation)).toHaveLength(0);
      });
    });
  });
  describe('define routes by routeSettings', () => {
    test('call page module with path and callback', () => {
      shallow(<Router routeSettings={routeSettingsArray} />);
      expect(page.mock.calls[0][0]).toBe(routeSettingsArray[0].path);
      expect(page.mock.calls[1][0]).toBe(routeSettingsArray[1].path);
    });
    describe('start page with pageOptions object', () => {
      test('from props', () => {
        shallow(<Router pageOptions={{}} routeSettings={routeSettingsArray} />);
        expect(page.start).toBeCalledWith({});
      });
      test('default', () => {
        shallow(<Router routeSettings={routeSettingsArray} />);
        expect(page.start).toBeCalledWith({ hashbang: false });
      });
    });
    test('set base if needed', () => {
      shallow(<Router base={'/bla'} routeSettings={routeSettingsArray} />);
      expect(page.base).toBeCalledWith('/bla');
    });
    test('rediret to first route', () => {
      shallow(<Router routeSettings={routeSettingsArray} />);
      expect(page.redirect).toBeCalledWith(routeSettingsArray[0].path);
    });
    test('render first component by path', () => {
      const wrapper = shallow(<Router routeSettings={routeSettingsArray} />);
      let pageCallback = page.mock.calls[0][1];
      pageCallback();
      const wrapper1 = shallow(wrapper.instance().state.component);
      expect(wrapper1.find('.first-componenet')).toHaveLength(1);
      expect(wrapper1.find('.second-componenet')).toHaveLength(0);
    });
    test('render second component by path', () => {
      const wrapper = shallow(<Router routeSettings={routeSettingsArray} />);
      let pageCallback = page.mock.calls[1][1];
      pageCallback();
      const wrapper1 = shallow(wrapper.instance().state.component);
      expect(wrapper1.find('.second-componenet')).toHaveLength(1);
      expect(wrapper1.find('.first-componenet')).toHaveLength(0);
    });
  });
});
