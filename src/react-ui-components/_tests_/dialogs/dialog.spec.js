import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { shallow } from 'enzyme';
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

describe('<Dialog />', () => {
  let wrapperShallow;
  beforeAll(() => {
    jest.doMock('reactUiComponents/dialogs/dialog', () => ({
      settings,
      isOpen: true
    }));

    const Dialog = require('reactUiComponents/dialogs/dialog.jsx').default;
    wrapperShallow = shallow(
      <Dialog.wrappedComponent
        languageStore={languageStore}
        classes={{ direction: 'rtl' }}
      />
    );
  });
  describe('Title', () => {
    test('renders title', () => {
      expect(wrapperShallow.find(DialogTitle)).toHaveLength(1);
    });
    test('title text mach the settings title', () => {
      expect(wrapperShallow.find(DialogTitle).props().children).toEqual(
        'Mock Title'
      );
    });
  });

  describe('Content', () => {
    test('renders DialogContent', () => {
      expect(wrapperShallow.find(DialogContent)).toHaveLength(1);
    });
    describe('settings content is String', () => {
      test('renders DialogContentText', () => {
        expect(wrapperShallow.find(DialogContentText)).toHaveLength(1);
      });
      test('content text match the settings content', () => {
        expect(wrapperShallow.find(DialogContentText).props().children).toEqual(
          'Mock Message'
        );
      });
    });
  });
  describe('Buttons', () => {
    test('renders sum of buttons as the settings.buttons', () => {
      expect(wrapperShallow.find(Button)).toHaveLength(
        Object.keys(settings.buttons).length
      );
    });
    test('buttons texts match the settings.buttonsTexts', () => {
      expect(
        wrapperShallow
          .find(Button)
          .at(0)
          .props().children
      ).toEqual('כן');
      expect(
        wrapperShallow
          .find(Button)
          .at(1)
          .props().children
      ).toEqual('לא');
    });
    test('click on buttons call the  callback in the settings.buttons', () => {
      wrapperShallow
        .find(Button)
        .at(0)
        .simulate('click');
      expect(mockOk).toHaveBeenCalled();

      wrapperShallow
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
      const Dialog = require('reactUiComponents/dialogs/dialog.jsx').default;
      wrapperWithComponent = shallow(
        <Dialog.wrappedComponent
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
