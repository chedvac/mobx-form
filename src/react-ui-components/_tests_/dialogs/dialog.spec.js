import React from 'react';
import { Provider } from 'mobx-react';
import dialog from 'reactUiComponents/dialogs/dialog.js';

import Dialog from 'reactUiComponents/dialogs/dialog.jsx';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount, shallowMount } from 'enzyme';
import languageStore from 'govil-common-content/forms-business-components/src/language';

// jest.mock('reactUiComponents/dialogs/dialog');

Enzyme.configure({ adapter: new Adapter() });

jest.mock('reactUiComponents/dialogs/dialog', () => {
  return {
    state: {
      isOpen: false,
      title: 'Mock Title',
      content: 'Mock Message',
      buttons: []
    }
  };
});
let wrapper, wrapperWithComponent;

describe('<Dialog />', () => {
  beforeAll(() => {
    wrapper = shallow(
      <Dialog.wrappedComponent
        languageStore={languageStore}
        classes={{ direction: 'rtl' }}
      />
    );
  });

  test('renders title', () => {
    expect(wrapper.find(DialogTitle)).toHaveLength(1);
  });
  test('title text mach the store title', () => {
    // expect(wrapper.find(DialogTitle).find('Mock Title')).toHaveLength(1);
    expect(wrapper.find(DialogTitle).html()).toEqual(
      expect.stringContaining('Mock Title')
    );
  });
  describe('Content', () => {
    test('renders DialogContent', () => {
      expect(wrapper.find(DialogContent)).toHaveLength(1);
    });
    describe('store content is String', () => {
      test('renders DialogContentText', () => {
        expect(wrapper.find(DialogContentText)).toHaveLength(1);
      });
      test('content text match the store content', () => {
        expect(wrapper.find(DialogContentText).html()).toEqual(
          expect.stringContaining('Mock Message')
        );
      });
    });

    // describe('Component', () => {
    //   class SubComponent extends React.Component {
    //     render() {
    //       return (
    //         <a href="https://reactjs.org/docs/typechecking-with-proptypes.html">
    //           Hello
    //         </a>
    //       );
    //     }
    //   }
    //   beforeAll(() => {
    //     jest.doMock('reactUiComponents/dialogs/dialog', () => {
    //       return {
    //         state: {
    //           isOpen: false,
    //           title: 'Mock Title',
    //           content: 'Mock 2Message',
    //           buttons: []
    //         }
    //       };
    //     });
    //     wrapperWithComponent = shallow(
    //       <Dialog.wrappedComponent languageStore={languageStore} />
    //     );
    //   });
    //   // expect(wrapper.find(DialogTitle).find('Mock Title')).toHaveLength(1);
    //   test('not renders DialogContentText', () => {
    //     expect(wrapperWithComponent.find(DialogContentText)).toHaveLength(0);
    //   });
    //   test('SubComponent is rendered', () => {
    //     expect(wrapperWithComponent.find(DialogContentText).html()).toEqual(
    //       expect.stringContaining('Mock 2Message')
    //     );
    //   });
    // });
  });
});
