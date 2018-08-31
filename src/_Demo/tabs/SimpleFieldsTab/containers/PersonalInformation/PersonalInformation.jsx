import React from 'react';
import { observer, inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import { getPropsField } from 'mobx-react-form/getProps';

import Input from 'react-ui-components/fields/Input';
import Textarea from 'react-ui-components/fields/Textarea';
import Select from 'react-ui-components/fields/Select';
import DatePicker from 'react-ui-components/fields/DatePicker/DatePicker';
import Row from 'react-ui-components/structure/row';
import SubTitle from 'react-ui-components/titles/subTitle';
import BlueButton from 'react-ui-components/buttons/blueButton';
import WhiteButton from 'react-ui-components/buttons/whiteButton';

// const styles = theme => ({
//   root: { flexGrow: 1 }
// });

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
    const { userDetails } = this.props;

    return (
      <div>
        <Grid container>
          <SubTitle>דוגמא לשדות רגילים</SubTitle>
          <Row>
            <Input
              label={this.currentResources().firstName}
              {...getPropsField(userDetails, 'firstName')}
            />
            <Input
              label={this.currentResources().lastName}
              {...getPropsField(userDetails, 'lastName')}
            />
            <Input
              label={this.currentResources().age}
              {...getPropsField(userDetails, 'age')}
            />
            <Input
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
            className="col-md-4"
            label={this.currentResources().birthDate}
            {...getPropsField(userDetails, 'birthDate')}
          />

          <Select
            className="col-md-4"
            label={this.currentResources().status}
            {...getPropsField(userDetails, 'status')}
            options={this.statusOptions}
          />
        </Grid>

        <span className="error-message">{this.props.message}</span>
      </div>
    );
  }
}
