import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import Row from 'react-ui-components/structure/row';

import Typography from '@material-ui/core/Typography';
import BlueButton from 'react-ui-components/buttons/blueButton';
import WhiteButton from 'react-ui-components/buttons/blueButton';
import Divider from '@material-ui/core/Divider';

import Input from 'react-ui-components/fields/Input';
import { getPropsField } from 'mobx-react-form/getProps';
import saveForm from 'govil-common-content/forms-business-components/src/saveForm';
import dialog from 'mobx-business-components/dialog';
import { bind } from 'lodash-decorators';

import styles from './styles';

@withStyles(styles)
@inject('languageStore')
// @observer
class EmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      saveByEmailTitle: {
        hebrew: 'קבלת קישור לשירות באמצעות דואר אלקטרוני',
        english: 'Get the link by email',
        arabic: 'تلقي الرابط للخدمة بالبريد الإلكتروني'
      },
      insertEmail: {
        hebrew: 'הזינו כתובת דואר אלקטרוני',
        english: 'Enter your email',
        arabic: 'ادخلوا البريد الإلكتروني'
      },
      validateEmail: {
        hebrew: 'אמתו את כתובת הדואר האלקטרוני',
        english: 'Confirm your email',
        arabic: 'التحقق من البريد الإلكتروني'
      },
      cancelButton: {
        hebrew: 'ביטול',
        english: 'Cancel',
        arabic: 'إلغاء'
      },
      confirm: {
        hebrew: 'אישור',
        english: 'Confirm',
        arabic: 'موافقة'
      },
      manualTyping: {
        hebrew: 'עליך להזין ערך בשדה זה ידנית',
        english: 'You cannot paste details into this field.',
        arabic: 'يجب إدخال قيمة خطيًا في هذا الحقل'
      }
    };
  }
  closeDialog() {
    dialog.close();
  }
  @bind()
  preventPaste() {
    saveForm.validateables.emailValidation.setValidationState({
      message: this.props.languageStore
        .computedResourcesProvider(this.texts.manualTyping)
        .get()
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography color="inherit" align="center">
          {this.props.languageStore
            .computedResourcesProvider(this.texts.saveByEmailTitle)
            .get()}
        </Typography>
        <Divider light className={classes.divider} />
        <Row>
          <Input
            label={this.props.languageStore
              .computedResourcesProvider(this.texts.insertEmail)
              .get()}
            {...getPropsField(saveForm, 'email')}
            lg={6}
            sm={12}
          />
          <Input
            label={this.props.languageStore
              .computedResourcesProvider(this.texts.validateEmail)
              .get()}
            {...getPropsField(saveForm, 'emailValidation')}
            onPaste={this.preventPaste}
            lg={6}
            sm={12}
          />
        </Row>

        <Row>
          <WhiteButton
            variant="outlined"
            className={classes.button}
            onClick={this.closeDialog}
          >
            {this.props.languageStore
              .computedResourcesProvider(this.texts.cancelButton)
              .get()}
          </WhiteButton>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={saveForm.sendMail}
          >
            {this.props.languageStore
              .computedResourcesProvider(this.texts.confirm)
              .get()}
          </BlueButton>
        </Row>
      </Grid>
    );
  }
}

export default EmailScreen;