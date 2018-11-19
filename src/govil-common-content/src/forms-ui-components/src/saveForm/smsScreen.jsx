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

import styles from './styles';

@withStyles(styles)
@inject('languageStore')
// @observer
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
    dialog.close();
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography color="inherit" align="center">
          {this.props.languageStore
            .computedResourcesProvider(this.texts.saveBySMS)
            .get()}
        </Typography>
        <Divider light className={classes.divider} />
        <Row>
          <Input
            label={this.props.languageStore
              .computedResourcesProvider(this.texts.insertPhoneNumber)
              .get()}
            {...getPropsField(saveForm, 'cellNumber')}
            lg={6}
            sm={12}
          />
          <Input
            label={this.props.languageStore
              .computedResourcesProvider(this.texts.validatePhoneNumber)
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
              .computedResourcesProvider(this.texts.cancelButton)
              .get()}
          </WhiteButton>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={saveForm.sendSMS}
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

export default SmsScreen;
