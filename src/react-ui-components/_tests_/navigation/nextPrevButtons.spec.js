import NextPrevButtons from 'react-ui-components/navigation/nextPrevButtons';
import RouteSettings from 'react-navigation-router/RouteSettings';
import languageStore from 'govil-common-content/forms-business-components/src/language';
import BlueButton from 'react-ui-components/buttons/BlueButton';
import WhiteButton from 'react-ui-components/buttons/WhiteButton';

import React from 'react';
import { shallow } from 'enzyme';

const Component = props => <div className={'first-componenet'} />;
const Component1 = props => <div className={'second-componenet'} />;
const classes = {
  navigateButton: 'navigateButton',
  hide: 'hide'
};
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
let wrapper;
const originalConsoleError = console.error;
afterAll(() => {
  console.error = originalConsoleError;
});
describe('<NextPrevButtons />', () => {
  beforeEach(() => {
    // jest.spyOn(console, 'error');
    console.error = jest.fn();
  });
  describe('props', () => {
    describe('routeSettings', () => {
      test('is require', () => {
        expect(() => {
          wrapper = shallow(
            <NextPrevButtons.wrappedComponent
              classes={classes}
              languageStore={languageStore}
              history={{ path: '/simple' }}
            />
          );
        }).toThrow();
        expect(console.error).toBeCalled();
      });
      test('should be array', () => {
        expect(() => {
          wrapper = shallow(
            <NextPrevButtons.wrappedComponent
              classes={classes}
              languageStore={languageStore}
              history={{ path: '/simple' }}
              routeSettings={routeSettingsArray[0]}
            />
          );
        }).toThrow();
        expect(console.error).toBeCalled();
      });
      test('should be array of RouteSettings', () => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: '/simple' }}
            routeSettings={routeSettingsArray}
          />
        );
        expect(wrapper).toBeDefined();
      });
    });
    describe('history', () => {
      test('is require', () => {
        expect(() => {
          wrapper = shallow(
            <NextPrevButtons.wrappedComponent
              classes={classes}
              languageStore={languageStore}
              routeSettings={routeSettingsArray}
            />
          );
        }).toThrow();

        expect(console.error).toBeCalled();
      });
      test('should be object', () => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            routeSettings={routeSettingsArray}
            history={'/simple'}
          />
        );
        expect(console.error).toBeCalled();
      });
      test('should be object with path key', () => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            routeSettings={routeSettingsArray}
            history={{ bla: '/simple' }}
          />
        );
        expect(console.error).toBeCalled();
      });
      test('should be object of history', () => {
        const wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            routeSettings={routeSettingsArray}
            history={{ path: '/simple' }}
          />
        );
        expect(wrapper).toBeDefined();
      });
    });
  });
  describe('prev button', () => {
    describe('current path is first in routeSettings -', () => {
      beforeEach(() => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: routeSettingsArray[0].path }}
            routeSettings={routeSettingsArray}
          />
        )
          .find('a')
          .first();
      });
      test('href is "/"', () => {
        expect(wrapper.props().href).toBe('/');
      });
      test('hide prev button', () => {
        expect(wrapper.props().className).toContain('hide');
      });
    });
    describe('current path is not first in routeSettings -', () => {
      beforeEach(() => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: routeSettingsArray[1].path }}
            routeSettings={routeSettingsArray}
          />
        )
          .find('a')
          .first();
      });
      test('href equal to prev path', () => {
        expect(wrapper.props().href).toBe(routeSettingsArray[0].path);
      });
      test('hide prev button', () => {
        expect(wrapper.props().className).not.toContain('hide');
      });
    });
    describe('children - BlueButton', () => {
      beforeEach(() => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: routeSettingsArray[1].path }}
            routeSettings={routeSettingsArray}
          />
        )
          .find('a')
          .first()
          .find(BlueButton);
      });
      test('render', () => {
        expect(wrapper).toHaveLength(1);
      });
      test('text', () => {
        expect(wrapper.dive().html()).toContain('לשלב הקודם');
      });
    });
  });
  describe('next button', () => {
    describe('current path is last in routeSettings -', () => {
      beforeEach(() => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: routeSettingsArray[1].path }}
            routeSettings={routeSettingsArray}
          />
        )
          .find('a')
          .at(1);
      });
      test('href is "/"', () => {
        expect(wrapper.props().href).toBe('/');
      });
      test('hide next button', () => {
        expect(wrapper.props().className).toContain('hide');
      });
    });
    describe('current path is not last in routeSettings -', () => {
      beforeEach(() => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: routeSettingsArray[0].path }}
            routeSettings={routeSettingsArray}
          />
        )
          .find('a')
          .at(1);
      });
      test('href equal to next path', () => {
        expect(wrapper.props().href).toBe(routeSettingsArray[1].path);
      });
      test('hide prev button', () => {
        expect(wrapper.props().className).not.toContain('hide');
      });
    });
    describe('children - WhiteButton', () => {
      beforeEach(() => {
        wrapper = shallow(
          <NextPrevButtons.wrappedComponent
            classes={classes}
            languageStore={languageStore}
            history={{ path: routeSettingsArray[1].path }}
            routeSettings={routeSettingsArray}
          />
        )
          .find('a')
          .at(1)
          .find(WhiteButton);
      });
      test('render', () => {
        expect(wrapper).toHaveLength(1);
      });
      test('text', () => {
        expect(wrapper.dive().html()).toContain('לשלב הבא');
      });
    });
  });
});
