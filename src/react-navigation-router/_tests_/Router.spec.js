import Router from 'reactNavigationRouter/Router';
import React from 'react';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
class SimpleFieldsTab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div />;
  }
}
class AboveContentElements extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div />;
  }
}
const Component = new SimpleFieldsTab();
const routeSettingsArray = [
  new RouteSettings({
    name: 'לשדות רגילים',
    path: '/SimpleFields',
    component: SimpleFieldsTab
  }),
  new RouteSettings({
    name: 'טבלאות',
    path: '/Tables',
    component: SimpleFieldsTab
  })
];
let spy;
describe('<Router />', () => {
  describe('props', () => {
    beforeEach(() => {
      spy = jest.spyOn(console, 'error');
    });
    afterEach(() => {
      spy.mockRestore();
    });
    it('routeSettings is require', () => {
      expect(() => {
        const wrapper = shallow(<Router />);
      }).toThrow();
      expect(console.error).toBeCalled();
    });
    it('routeSettings should be array', () => {
      expect(() => {
        const wrapper = shallow(
          <Router routeSettings={routeSettingsArray[0]} />
        );
      }).toThrow();
      expect(console.error).toBeCalled();
    });
    it('routeSettings should be array of RouteSettings', () => {
      shallow(<Router routeSettings={routeSettingsArray} />);
      expect(console.error).not.toBeCalled();
    });
    describe('AboveContentElements', ()=>{
      it('routeSettings should be array of RouteSettings', () => {
        shallow(<Router routeSettings={routeSettingsArray} aboveContentElements={} />);
        expect(console.error).not.toBeCalled();
      });
    })
  });
  xit('renders three <Foo /> components', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper.find()).to.have.lengthOf(3);
  });
});
