import texts from './texts'
const language = 'hebrew';
export default [{
        name: 'save',
        action: function(){}, 
        isEnable: true,
        title: texts[language].saveTitle, 
        classes:'', 
        accesskey:'', 
        actionText : texts[language].saveText
    },  {
        name: 'validate',
        action: function(){}, 
        isEnable: true,
        title: texts[language].validateTitle, 
        classes:'', 
        accesskey:'', 
        actionText : texts[language].validateText
    },  {        
        name: 'print',
        action: function(){}, 
        isEnable: true,
        title: texts[language].printTitle, 
        classes:'', 
        accesskey:'', 
        actionText: texts[language].printText
    },  {
        name: 'changeView',
        action: function(){}, 
        isEnable: true,
        title:  texts[language].printText, 
        classes:'', 
        accesskey:'', 
        actionText : texts[language].printText
    },  {
        name: 'saveAsPdf',
        action: function(){}, 
        isEnable: true,
        title: texts[language].saveAsPDFTitle, 
        classes:'', 
        accesskey:'', 
        actionText: texts[language].saveAsPDFText
    },  {
        name: 'submit',
        action: function(){}, 
        isEnable: true,
        title:texts[language].submitTitle, 
        classes:'', 
        accesskey:'', 
        actionText : texts[language].submitText
    },  {
        name: 'filesAttachment',
        action: function(){}, 
        isEnable: true,
        title: texts[language].fileAttachmentTitle, 
        classes:'', 
        accesskey:'', 
        actionText : texts[language].fileAttachmentText
    }
]
