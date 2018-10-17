import React from 'react';
// jest.mock('reactUiComponents/dialogs/dialog');
// import dialog from 'reactUiComponents/dialogs/dialog.js';

// import Dialog from 'reactUiComponents/dialogs/dialog.jsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { shallow, mount } from 'enzyme';
import languageStore from 'govil-common-content/forms-business-components/src/language';

const mockOk = jest.fn();
const mockCancel = jest.fn();
const settings = {
  title: 'Mock Title',
  content: 'Mock Message',
  buttons: {
    ok: { type: 'ok', click: mockOk },
    cancel: { type: 'cancel', click: mockCancel }
  },
  buttonsTexts: {
    ok: {
      hebrew: 'כן',
      english: 'Yes',
      arabic: 'التأكيد'
    },
    cancel: {
      hebrew: 'לא',
      english: 'No',
      arabic: 'الغاء'
    }
  }
};

let wrapper;

describe('<Dialog />', () => {
  beforeAll(() => {
    jest.doMock('reactUiComponents/dialogs/dialog', () => {
      return { settings, isOpen: true };
    });
    const Dialog = require('reactUiComponents/dialogs/dialog.jsx');
    // let wrapperShallow;
    wrapper = mount(
      <Dialog.default
        languageStore={languageStore}
        classes={{ direction: 'rtl' }}
      />
    );
    // wrapperShallow = shallow(
    //   <Dialog.wrappedComponent
    //     languageStore={languageStore}
    //     classes={{ direction: 'rtl' }}
    //   />
    // );
  });
  describe('Title', () => {
    test('renders title', () => {
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
    });
    test('title text mach the settings title', () => {
      expect(wrapper.find(DialogTitle).text()).toContain('Mock Title'); //" Mock Title"
    });
    // test('title text mach the settings title', () => {
    //   expect(wrapperShallow.find(DialogTitle).text()).toContain('Mock Title1');//"<WithStyles(DialogTitle) />"
    // });
    // test('title text mach the settings title', () => {
    //   expect(wrapperShallow.find(DialogTitle).html()).toContain('Mock Title1'); //  "<div class=\"MuiDialogTitle-root-44\" id=\"alert-dialog-title\"><h2 class=\"MuiTypography-root-45 MuiTypography-title-51\"> Mock Title</h2></div>"
    // });
  });

  describe('Content', () => {
    test('renders DialogContent', () => {
      expect(wrapper.find(DialogContent)).toHaveLength(1);
    });
    describe('settings content is String', () => {
      test('renders DialogContentText', () => {
        expect(wrapper.find(DialogContentText)).toHaveLength(1);
      });
      test('content text match the settings content', () => {
        expect(wrapper.find(DialogContentText).text()).toContain(
          'Mock Message'
        );
      });
    });
  });
  describe('Buttons', () => {
    test('renders sum of buttons as the settings.buttons', () => {
      expect(wrapper.find(Button)).toHaveLength(
        Object.keys(settings.buttons).length
      );
    });
    test('buttons texts match the settings.buttonsTexts', () => {
      expect(
        wrapper
          .find(Button)
          .at(0)
          .text()
      ).toEqual('כן');
      expect(
        wrapper
          .find(Button)
          .at(1)
          .text()
      ).toEqual('לא');
    });
    test('click on buttons call the  callback in the settings.buttons', () => {
      wrapper
        .find(Button)
        .at(0)
        .simulate('click');
      expect(mockOk).toHaveBeenCalled();

      wrapper
        .find(Button)
        .at(1)
        .simulate('click');
      expect(mockCancel).toHaveBeenCalled();
    });
  });
  describe('Component', () => {
    let wrapperWithComponent;
    class SubComponent extends React.Component {
      render() {
        return (
          <a href="https://reactjs.org/docs/typechecking-with-proptypes.html">
            Hello
          </a>
        );
      }
    }
    beforeAll(() => {
      jest.resetModules();
      jest.doMock('reactUiComponents/dialogs/dialog', () => ({
        settings: {
          content: SubComponent
        },
        isOpen: true
      }));
      const Dialog = require('reactUiComponents/dialogs/dialog.jsx');
      wrapperWithComponent = mount(
        <Dialog.default
          languageStore={languageStore}
          classes={{ direction: 'rtl' }}
        />
      );
    });
    test('not renders DialogContentText', () => {
      expect(wrapperWithComponent.find(DialogContentText)).toHaveLength(0);
    });
    test('SubComponent is rendered', () => {
      expect(wrapperWithComponent.find(SubComponent)).toHaveLength(1);
    });
  });
});
