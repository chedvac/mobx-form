import { shallow } from 'enzyme';
import Router from 'reactNavigationRouter/Router';
describe('<Router />', () => {
  describe('props', () => {
    it('routeSettings should be array of ', () => {
      const wrapper = shallow(<Router />);
      expect(wrapper.find()).to.have.lengthOf(3);
    });
  });
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper.find()).to.have.lengthOf(3);
  });
});
