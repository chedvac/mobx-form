import Steppers from 'reactUiComponents/navigation/steppers';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Link from 'reactNavigationRouter/link';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';

import React from 'react';
import { shallow } from 'enzyme';
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
let wrapper, linkwrapper;
const originalConsoleError = console.error;
afterAll(() => {
  console.error = originalConsoleError;
});
describe('<Steppers />', () => {
  beforeEach(() => {
    // jest.spyOn(console, 'error');
    console.error = jest.fn();
  });
  describe('props', () => {
    describe('routeSettings', () => {
      test('is require', () => {
        wrapper = shallow(<Steppers history={{ path: '/simple' }} />);
        expect(() => {
          wrapper.dive();
        }).toThrow();
        expect(console.error).toBeCalled();
      });
      test('should be array', () => {
        wrapper = shallow(
          <Steppers
            history={{ path: '/simple' }}
            routeSettings={routeSettingsArray[0]}
          />
        );
        expect(() => {
          wrapper.dive();
        }).toThrow();
        expect(console.error).toBeCalled();
      });
      test('should be array of RouteSettings', () => {
        wrapper = shallow(
          <Steppers
            history={{ path: '/simple' }}
            routeSettings={routeSettingsArray}
          />
        ).dive();
        expect(wrapper).toBeDefined();
      });
    });
    describe('history', () => {
      test('is require', () => {
        wrapper = shallow(<Steppers routeSettings={routeSettingsArray} />);
        expect(console.error).toBeCalled();
      });
      test('should be object', () => {
        wrapper = shallow(
          <Steppers routeSettings={routeSettingsArray} history={'/simple'} />
        );
        expect(console.error).toBeCalled();
      });
      test('should be object with path key', () => {
        wrapper = shallow(
          <Steppers
            routeSettings={routeSettingsArray}
            history={{ bla: '/simple' }}
          />
        );
        expect(console.error).toBeCalled();
      });
      test('should be object of history', () => {
        const wrapper = shallow(
          <Steppers
            routeSettings={routeSettingsArray}
            history={{ path: '/simple' }}
          />
        );
        expect(wrapper.dive()).toBeDefined();
      });
    });
  });
  describe('Stepper', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Steppers history={{}} routeSettings={routeSettingsArray} />
      )
        .dive()
        .find(Stepper);
    });
    test('render Stepper', () => {
      expect(wrapper).toHaveLength(1);
    });
    describe('props', () => {
      test('alternativeLabel', () => {
        expect(wrapper.props().alternativeLabel).toBeDefined();
      });
      test('nonLinear', () => {
        expect(wrapper.props().nonLinear).toBeDefined();
      });
      describe('activeStep', () => {
        test('exist', () => {
          expect(wrapper.props().activeStep).toBeDefined();
        });
        test('equal 0 by default (if history.path is not define)', () => {
          expect(wrapper.props().activeStep).toBe(0);
        });
        test('is the index in routeSettings of history.path prop ', () => {
          wrapper = shallow(
            <Steppers history={{}} routeSettings={routeSettingsArray} />
          );
          wrapper.setProps({ history: { path: routeSettingsArray[1].path } });
          expect(
            wrapper
              .dive()
              .find(Stepper)
              .props().activeStep
          ).toBe(1);
        });
      });
    });
  });
  describe('step', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Steppers history={{}} routeSettings={routeSettingsArray} />
      )
        .dive()
        .find(Stepper)
        .dive()
        .find(Step);
    });
    test('is rendered', () => {
      expect(wrapper.first()).toBeDefined();
    });
    test('render forEach route', () => {
      expect(wrapper).toHaveLength(routeSettingsArray.length);
    });
    describe('children', () => {
      describe('Link', () => {
        beforeEach(() => {
          linkwrapper = wrapper
            .first()
            .dive()
            .find(Link);
        });
        test('is rendered', () => {
          expect(linkwrapper).toBeDefined();
        });
        test('get path as "to" prop', () => {
          expect(linkwrapper.props().to).toBe(routeSettingsArray[0].path);
        });
        test('render StepButton as children', () => {
          expect(linkwrapper.find(StepButton)).toHaveLength(1);
        });
      });
      describe('route name', () => {
        test('is rendered', () => {
          expect(
            wrapper
              .first()
              .dive()
              .find(Typography)
              .html()
          ).toContain(routeSettingsArray[0].name);
        });
      });
    });
  });
});
