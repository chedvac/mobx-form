import Link from 'react-navigation-router/Link';
import React from 'react';
import { shallow } from 'enzyme';
const InnerComponenet = props => <sapn className={props.className || ''} />;
let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <Link to={'/SimpleFields'} prop1={'1'} prop2={'2'} linkClassNames={'link'}>
      <InnerComponenet />
    </Link>
  );
});
describe('<Link />', () => {
  test('to prop- render <a> element  with "to" as href', () => {
    expect(wrapper.find('a [href="/SimpleFields"]')).toHaveLength(1);
  });
  test('linkClassNames - add linkClassNames to <a> as className', () => {
    expect(wrapper.find('.link')).toHaveLength(1);
  });
  test('render children', () => {
    expect(wrapper.find(InnerComponenet)).toHaveLength(1);
  });
  test('not pass "to" prop to its children', () => {
    expect(wrapper.find(InnerComponenet).props().to).not.toBeDefined();
  });
  test('not pass "linkClassNames" prop to its children', () => {
    expect(
      wrapper.find(InnerComponenet).props().linkClassNames
    ).not.toBeDefined();
  });
  test('not pass "children" prop to its children', () => {
    expect(wrapper.find(InnerComponenet).props().children).not.toBeDefined();
  });
  test('pass all other props to its children', () => {
    expect(
      wrapper
        .find(InnerComponenet)
        .first()
        .props().prop1
    ).toBe('1');
    expect(
      wrapper
        .find(InnerComponenet)
        .first()
        .props().prop2
    ).toBe('2');
  });
});
