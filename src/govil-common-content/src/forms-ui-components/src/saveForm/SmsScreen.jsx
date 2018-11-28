import React from 'react';
import { inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Row from 'react-ui-components/structure/Row';

import Typography from '@material-ui/core/Typography';
import BlueButton from 'react-ui-components/buttons/BlueButton';
import WhiteButton from 'react-ui-components/buttons/BlueButton';
import Divider from '@material-ui/core/Divider';

import TextField from 'react-ui-components/fields/TextField';
import { getPropsField } from 'mobx-react-form/getProps';
import saveForm from 'govil-common-content/forms-business-components/src/saveForm';
import dialog from 'mobx-business-components/dialog';

import styles from './styles';

@withStyles(styles)
@inject('languageStore')
class SmsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      saveBySMS: {
        hebrew: 'קבלת קישור לשירות באמצעות מסרון',
        english: 'Get link by SMS text message',
        arabic: 'تلقي الرابط بواسطة رسالة SMS'
      },
      insertPhoneNumber: {
        hebrew: 'הזינו מספר טלפון נייד',
        english: 'Enter your mobile number',
        arabic: 'ادخلوا رقم الهاتف الخلوي'
      },
      validatePhoneNumber: {
        hebrew: 'אמתו את מספר הטלפון הנייד',
        english: 'Confirm your mobile number',
        arabic: 'التحقق من رقم الخلوي'
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
      }
    };
  }
  closeDialog() {
    //saveForm.reset();
    dialog.close();
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography color="inherit" align="center" id="alert-dialog-title">
          {this.props.languageStore
            .resourcesProvider(this.texts.saveBySMS)
            .get()}
        </Typography>
        <Divider light className={classes.divider} />
        <Row>
          <TextField
            label={this.props.languageStore
              .resourcesProvider(this.texts.insertPhoneNumber)
              .get()}
            {...getPropsField(saveForm, 'cellNumber')}
            lg={6}
            sm={12}
          />
          <TextField
            label={this.props.languageStore
              .resourcesProvider(this.texts.validatePhoneNumber)
              .get()}
            {...getPropsField(saveForm, 'cellNumberValidation')}
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
              .resourcesProvider(this.texts.cancelButton)
              .get()}
          </WhiteButton>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={saveForm.sendSMS}
          >
            {this.props.languageStore
              .resourcesProvider(this.texts.confirm)
              .get()}
          </BlueButton>
        </Row>
      </Grid>
    );
  }
}

export default SmsScreen;
