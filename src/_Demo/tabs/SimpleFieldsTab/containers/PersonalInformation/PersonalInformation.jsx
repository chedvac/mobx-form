import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'reactUiComponents/Input';
import Textarea from 'reactUiComponents/Textarea';
import Select from 'reactUiComponents/Select';
import Checkbox from 'reactUiComponents/Checkbox';
import DatePicker from 'reactUiComponents/DatePicker/DatePicker';
import { getPropsField } from 'mobxReactForm/utils/getProps';
import City from '../../../../../components/city/city';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Row from 'reactUiComponents/core/row';
import SubTitle from 'reactUiComponents/core/subTitle';
import BlueButton from 'reactUiComponents/core/blueButton';
import WhiteButton from 'reactUiComponents/core/whiteButton';

const styles = theme => ({
  root: { flexGrow: 1 }
});

@withStyles(styles)
@inject('applicationData')
@observer
export default class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);

    this.texts = {
      hebrew: {
        firstName: ' שם פרטי',
        lastName: ' שם משפחה',
        age: 'גיל הבן',
        fatherAge: 'גיל האב',
        comments: 'הערות',
        status: 'מצב משפחתי',
        agreement: 'אני מצהיר...',
        birthDate: 'תאריך לידה'
      },
      english: {
        firstName: 'first name',
        lastName: 'last name',
        age: 'age',
        fatherAge: 'fatherAge',
        comments: 'comments',
        status: 'status',
        agreement: 'I Agree...',
        birthDate: 'birth date'
      },
      arabic: {
        firstName: 'first name',
        lastName: 'last name',
        age: 'age',
        fatherAge: 'fatherAge',
        comments: 'comments',
        status: 'status',
        agreement: 'I Agree...',
        birthDate: 'birth date'
      }
    };
    this.currentResources = this.currentResources.bind(this);
    this.statusOptions = [
      { key: '1', value: 'נשוי' },
      { key: '2', value: 'רווק' },
      { key: '3', value: 'גרוש' }
    ];
  }
  currentResources = function() {
    return this.texts[this.props.applicationData.formLanguage.name];
  };

  render() {
    const { userDetails, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <SubTitle>דוגמא לשדות רגילים</SubTitle>
          <Row>
            <Input
              xs={4}
              label={this.currentResources().firstName}
              {...getPropsField(userDetails, 'firstName')}
            />
            <Input
              xs={4}
              label={this.currentResources().lastName}
              {...getPropsField(userDetails, 'lastName')}
            />
            <Input
              xs={4}
              label={this.currentResources().age}
              {...getPropsField(userDetails, 'age')}
            />
          </Row>
          <Row>
            <Input
              xs={12}
              label={this.currentResources().fatherAge}
              {...getPropsField(userDetails, 'fatherAge')}
            />
          </Row>
          <Row>
            <WhiteButton>לשלב הקודם</WhiteButton>
            <BlueButton>לשלב הבא</BlueButton>
          </Row>
          <Row>
            <Textarea
              xs={8}
              label={this.currentResources().comments}
              {...getPropsField(userDetails, 'comments')}
              rows={3}
              isAutoResize={false}
            />
          </Row>
          <br />
          <DatePicker
            xs={3}
            label={this.currentResources().birthDate}
            {...getPropsField(userDetails, 'birthDate')}
          />

          <Select
            xs={3}
            label={this.currentResources().status}
            {...getPropsField(userDetails, 'status')}
            options={this.statusOptions}
          />

          {/*
            <Grid item xs={6} sm={3}>
            <City {...getPropsField(userDetails, "city")} />
            </Grid> */}

          {/* <Checkbox
            className="col-md-4"
            label={this.currentResources().agreement}
            {...getPropsField(userDetails, "agreement")}
          /> */}
        </Grid>
        <span className="error-message">{this.props.message}</span>
      </div>
    );
  }
}
