import LanguagesMenu from 'govil-common-content/forms-ui-components/src/languagesMenu';

const toolbarButtons = {
  validateForm: {
    buttonText: {
      hebrew: 'בדוק תקינות'
    },
    className: 'ic-validateForm',
    action: () => {
      console.log('בודק תקינות הטופס');
    }
  },
  selectLanguage: {
    buttonText: {
      hebrew: 'בחירת שפת הטופס'
    },
    className: 'ic-language',
    popup: LanguagesMenu,
    action: () => {
      console.log(LanguagesMenu);
    }
  },
  submit: {
    buttonText: {
      hebrew: 'שלח'
    },
    className: 'ic-submit',
    action: () => {
      console.log('שולח את הטופס');
    }
  },
  print: {
    buttonText: {
      hebrew: 'הדפס'
    },
    className: 'ic-print',
    action: () => {
      console.log('מדפיס את הטופס');
    }
  },
  saveAsPDF: {
    buttonText: {
      hebrew: 'שמור כ PDF'
    },
    className: 'ic-saveAsPDF',
    action: () => {
      console.log('שומר כ PDF');
    }
  },
  attachments: {
    buttonText: {
      hebrew: 'צרופות'
    },
    className: 'ic-attachments',
    action: () => {
      console.log('צרופות הטופס');
    }
  },
  save: {
    buttonText: {
      hebrew: 'שמור'
    },
    className: 'ic-save',
    action: () => {
      console.log('שומר את הטופס');
    }
  }
};

export default toolbarButtons;