import Router from 'reactNavigationRouter/Router';
import React from 'react';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
//import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import page from 'page';
jest.mock('page');
// import jsdom from 'jsdom';
//Enzyme.configure({ adapter: new Adapter() });
class SimpleFieldsTab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div />;
  }
}

const TopNavigation = props => <div />;
const Component = new SimpleFieldsTab();
const routeSettingsArray = [
  new RouteSettings({
    name: 'לשדות רגילים',
    path: '/SimpleFields',
    component: Component
  }),
  new RouteSettings({
    name: 'טבלאות',
    path: '/Tables',
    component: Component
  })
];
let spy;
beforeAll(() => {
  const isNode = typeof window !== 'object';
});
describe('<Router />', () => {
  describe('props', () => {
    beforeEach(() => {
      spy = jest.spyOn(console, 'error');
    });
    afterEach(() => {
      spy.mockRestore();
    });
    test('routeSettings is require', () => {
      expect(() => {
        const wrapper = shallow(<Router />);
      }).toThrow();
    });
    test('routeSettings should be array', () => {
      expect(() => {
        const wrapper = shallow(
          <Router routeSettings={routeSettingsArray[0]} />
        );
      }).toThrow();
    });
    test('routeSettings should be array of RouteSettings', () => {
      shallow(<Router routeSettings={routeSettingsArray} />);
      expect(console.error).not.toBeCalled();
    });
  });
  describe('define routes', () => {
    test('use page module', () => {
      shallow(<Router routeSettings={routeSettingsArray} />);
      expect(page.mock.calls.length).toBe(2);
      expect(page.mock.calls[0].args[0]).toBe(routeSettingsArray[0].path);
      expect(page.start).toBeCalled();
      expect(page.redirect).toBeCalledWith(routeSettingsArray[0].path);
    });
    test('render component by path', () => {
      const wrapper = shallow(<Router routeSettings={routeSettingsArray} />);
      expect(wrapper.find(wrapper.state.component)).toHaveLength(1);
    });
  });
  describe('TopNavigation', () => {
    test('use page module', () => {
      shallow(
        <Router
          TopNavigation={TopNavigation}
          routeSettings={routeSettingsArray}
        />
      );
      expect(page.mock.calls.length).toBe(2);
      expect(page.mock.calls[0].args[0]).toBe(routeSettingsArray[0].path);
      expect(page.start).toBeCalled();
      expect(page.redirect).toBeCalledWith(routeSettingsArray[0].path);
    });
  });
});
