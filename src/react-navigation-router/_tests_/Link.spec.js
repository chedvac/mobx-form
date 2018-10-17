import Link from 'reactNavigationRouter/Link';
import React from 'react';
import { shallow } from 'enzyme';
import StepButton from '@material-ui/core/StepButton';

let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <Link to={'/SimpleFields'} prop1={'1'} prop2={'2'} linkClassNames={'link'}>
      <StepButton className={'inner-span'} />
    </Link>
  );
});
describe('<Link />', () => {
  describe('props', () => {
    test('to - render a with to as href', () => {
      expect(wrapper.find('a [href="/SimpleFields"]')).toHaveLength(1);
    });
    test('linkClassNames - add className to a', () => {
      expect(wrapper.find('.link')).toHaveLength(1);
    });
    test('render children', () => {
      console.log(wrapper.html());
      expect(wrapper.find('.inner-span')).toHaveLength(1);
    });
    test('pass Link props to children without to and linkClassNames', () => {
      console.log(wrapper.find('.inner-span').props());
      expect(wrapper.find('.inner-span').props()).toHaveLength(1);
    });
  });
});
