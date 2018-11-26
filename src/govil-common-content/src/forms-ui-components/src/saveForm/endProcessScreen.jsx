import React from 'react';
import { inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Row from 'react-ui-components/structure/row';

import Typography from '@material-ui/core/Typography';
import BlueButton from 'react-ui-components/buttons/blueButton';
import Divider from '@material-ui/core/Divider';
import OptionsScreen from 'govil-common-content/forms-ui-components/src/saveForm/optionsScreen';

import dialog from 'mobx-business-components/dialog';

import styles from './styles';

@withStyles(styles)
@inject('languageStore')
class EndProcessScreen extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      saveFormTitle: {
        arabic: 'حفظ',
        english: 'Save form',
        hebrew: 'שמירה'
      },
      formSavedNotice: {
        arabic: 'تم إرسال رابط للخدمة التي تم حفظها بناء على طلبكم.',
        english: 'A link to your saved form has been sent.',
        hebrew: 'קישור לשירות ששמרתם נשלח לפי בקשתכם.'
      },
      formSavedLatencyNotice: {
        arabic: ' يمكن فتح الخدمة خلال {} أيام.',
        english: 'You can use the link for {} days.',
        hebrew: ' פתיחת השירות אפשרית למשך undefined ימים.'
      },
      resend: {
        arabic: 'إعادة إرسال',
        english: 'Send again',
        hebrew: 'לשליחה חוזרת'
      },
      confirm: {
        arabic: 'موافقة',
        english: 'Confirm',
        hebrew: 'אישור'
      }
    };
  }
  resendClick() {
    //saveForm.reset();
    dialog.open({
      content: OptionsScreen
    });
  }
  confirmClick() {
    //saveForm.reset();
    dialog.close();
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography color="inherit" align="center" id="alert-dialog-title">
          {this.props.languageStore
            .computedResourcesProvider(this.texts.saveFormTitle)
            .get()}
        </Typography>
        <Divider light className={classes.divider} />
        <Grid id="alert-dialog-description">
          <Typography color="inherit" align="center">
            {this.props.languageStore
              .computedResourcesProvider(this.texts.formSavedNotice)
              .get()}
          </Typography>
          <Typography color="inherit" align="center">
            {this.props.languageStore
              .computedResourcesProvider(this.texts.formSavedLatencyNotice)
              .get()}
          </Typography>
        </Grid>
        <Row>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={this.resendClick}
          >
            {this.props.languageStore
              .computedResourcesProvider(this.texts.resend)
              .get()}
          </BlueButton>
          <BlueButton
            variant="outlined"
            className={classes.button}
            onClick={this.confirmClick}
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

export default EndProcessScreen;
