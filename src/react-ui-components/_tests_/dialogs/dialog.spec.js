import React from 'react';
// jest.mock('reactUiComponents/dialogs/dialog');
import dialog from 'reactUiComponents/dialogs/dialog.js';

import Dialog from 'reactUiComponents/dialogs/dialog.jsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import languageStore from 'govil-common-content/forms-business-components/src/language';

Enzyme.configure({ adapter: new Adapter() });

const mockOk = jest.fn();
const mockCancel = jest.fn();
const mockSettings = {
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
    dialog.open(mockSettings);
    wrapper = shallow(
      <Dialog.wrappedComponent
        languageStore={languageStore}
        classes={{ direction: 'rtl' }}
      />
    );
  });
  describe('Title', () => {
    test('renders title', () => {
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
    });
    test('title text mach the settings title', () => {
      // expect(wrapper.find(DialogTitle).find('Mock Title')).toHaveLength(1);
      expect(wrapper.find(DialogTitle).html()).toEqual(
        expect.stringContaining('Mock Title')
      );
    });
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
        expect(wrapper.find(DialogContentText).html()).toEqual(
          expect.stringContaining('Mock Message')
        );
      });
    });
  });
  describe('Buttons', () => {
    test('renders sum of buttons as the settings.buttons', () => {
      expect(wrapper.find(Button)).toHaveLength(
        Object.keys(mockSettings.buttons).length
      );
    });
    test('buttons texts match the settings.buttonsTexts', () => {
      expect(
        wrapper
          .find(Button)
          .at(0)
          .html()
      ).toEqual(expect.stringContaining('כן'));
      expect(
        wrapper
          .find(Button)
          .at(1)
          .html()
      ).toEqual(expect.stringContaining('לא'));
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
      dialog.open({ content: SubComponent });
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
