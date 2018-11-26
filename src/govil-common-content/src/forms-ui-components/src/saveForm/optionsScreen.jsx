import React from 'react';
import { inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Row from 'react-ui-components/structure/row';

import Typography from '@material-ui/core/Typography';
import BlueButton from 'react-ui-components/buttons/blueButton';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Sms from '@material-ui/icons/Sms';
import Divider from '@material-ui/core/Divider';
import EmailScreen from './emailScreen';
import SmsScreen from './smsScreen';
import dialog from 'mobx-business-components/dialog';
import styles from './styles';

@withStyles(styles)
@inject('languageStore')

// @observer
class OptionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      saveFormTitle: {
        arabic: 'حفظ',
        english: 'Save form',
        hebrew: 'שמירה'
      },
      notice: {
        hebrew: 'קישור לשירות ששמרתם ישלח אליכם מיד',
        english:
          'You can get a link to your saved form by email, or SMS to your mobile.',
        arabic: 'يرسل إليكم فورًا رابط للخدمة التي تم حفظها'
      },
      selectOption: {
        hebrew: 'בחרו את הדרך בה תרצו לקבל את הקישור:',
        english: 'Choose how you would like to receive the link.',
        arabic: 'اختاروا طريقة تلقي الرابط:'
      },
      inEmail: {
        hebrew: 'בדואר אלקטרוני',
        english: 'Email',
        arabic: 'بالبريد الإلكتروني'
      },
      inSMS: {
        hebrew: 'במסרון',
        english: 'SMS',
        arabic: 'رسالة SMS'
      }
    };
  }
  emailClick() {
    dialog.open({
      content: EmailScreen
    });
  }
  smsClick() {
    dialog.open({
      content: SmsScreen
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography color="inherit" align="center" id="alert-dialog-title">
          {this.props.languageStore
            .resourcesProvider(this.texts.saveFormTitle)
            .get()}
        </Typography>
        <Divider light className={classes.divider} />
        <Grid id="alert-dialog-description">
          <Typography color="inherit" align="center">
            {this.props.languageStore
              .resourcesProvider(this.texts.notice)
              .get()}
          </Typography>
          <Typography color="inherit" align="center">
            {this.props.languageStore
              .resourcesProvider(this.texts.selectOption)
              .get()}
          </Typography>
        </Grid>
        <Row>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={this.emailClick}
          >
            <AlternateEmail />
            {this.props.languageStore
              .resourcesProvider(this.texts.inEmail)
              .get()}
          </BlueButton>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={this.smsClick}
          >
            <Sms />
            {this.props.languageStore
              .resourcesProvider(this.texts.inSMS)
              .get()}
          </BlueButton>
        </Row>
      </Grid>
    );
  }
}

export default OptionsScreen;
