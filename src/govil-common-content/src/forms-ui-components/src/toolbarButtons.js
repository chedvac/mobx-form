import examples from 'govil-common-content/application-data/src/DemoData';
import LanguagesMenu from 'govil-common-content/forms-ui-components/src/LanguagesMenu';
import saveForm from 'govil-common-content/forms-business-components/src/saveForm';

export const toolbarButtonsNames = {
  validateForm: 'validateForm',
  submit: 'submit',
  print: 'print',
  saveAsPDF: 'saveAsPDF',
  attachments: 'attachments',
  save: 'save',
  selectLanguage: 'selectLanguage'
};

export const toolbarButtonsObject = {
  [toolbarButtonsNames.validateForm]: {
    buttonText: {
      hebrew: 'בדוק תקינות'
    },
    className: 'ic-validateForm',
    action: () => {
      console.log('בודק תקינות הטופס');
      examples.set_obsVal();
    }
  },
  [toolbarButtonsNames.selectLanguage]: {
    buttonText: {
      hebrew: 'בחירת שפת הטופס'
    },
    className: 'ic-language',
    popup: LanguagesMenu,
    action: () => {
      console.log(LanguagesMenu);
    }
  },
  [toolbarButtonsNames.submit]: {
    buttonText: {
      hebrew: 'שלח'
    },
    className: 'ic-submit',
    action: () => {
      console.log('שולח את הטופס');
    }
  },
  [toolbarButtonsNames.print]: {
    buttonText: {
      hebrew: 'הדפס'
    },
    className: 'ic-print',
    action: () => {
      console.log('מדפיס את הטופס');
    }
  },
  [toolbarButtonsNames.saveAsPDF]: {
    buttonText: {
      hebrew: 'שמור כ PDF'
    },
    className: 'ic-saveAsPDF',
    action: () => {
      console.log('שומר כ PDF');
    }
  },
  [toolbarButtonsNames.attachments]: {
    buttonText: {
      hebrew: 'צרופות'
    },
    className: 'ic-attachments',
    action: () => {
      console.log('צרופות הטופס');
    }
  },
  [toolbarButtonsNames.save]: {
    buttonText: {
      hebrew: 'שמור'
    },
    className: 'ic-save',
    action: () => {
      saveForm.openSaveModal();
    }
  }
};
