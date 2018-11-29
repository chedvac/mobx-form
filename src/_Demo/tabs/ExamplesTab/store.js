import dialog from 'mobx-business-components/dialog';
import ModularViewModel from 'mobx-vm/ModularViewModel';

class ExamplesTab extends ModularViewModel {
  async confirm() {
    try {
      await dialog.confirm({
        title: 'דוגמא לconfirm',
        content: 'הטופס נשלח בהצלחה',
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
        },
        maxWidth: 'xs'
      });
      console.log('resolve');
    } catch (err) {
      console.log('reject');
    }
  }
}

export default ExamplesTab;
