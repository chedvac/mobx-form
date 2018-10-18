import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import Row from 'react-ui-components/structure/row';

import Typography from '@material-ui/core/Typography';
import BlueButton from 'react-ui-components/buttons/blueButton';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Sms from '@material-ui/icons/Sms';
const styles = theme => {};

@withStyles(styles)
@inject('languageStore')
// @observer
class OptionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
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
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography color="inherit">
          {this.props.languageStore
            .computedResourcesProvider(this.texts.notice)
            .get()}
        </Typography>
        <Typography color="inherit">
          {this.props.languageStore
            .computedResourcesProvider(this.texts.selectOption)
            .get()}
        </Typography>
        <Row>
          <BlueButton variant="outlined" className={classes.button}>
            <AlternateEmail />
            {this.props.languageStore
              .computedResourcesProvider(this.texts.inEmail)
              .get()}
          </BlueButton>
          <BlueButton variant="outlined" className={classes.button}>
            <Sms />
            {this.props.languageStore
              .computedResourcesProvider(this.texts.inSMS)
              .get()}
          </BlueButton>
        </Row>
      </Grid>
    );
  }
}

export default OptionsScreen;
