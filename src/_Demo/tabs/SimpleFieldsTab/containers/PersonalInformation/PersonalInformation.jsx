import React from 'react';
import { observer, inject } from 'mobx-react';

import Input from '../../../../../Fields/Input';
import Textarea from '../../../../../Fields/Textarea';
import Select from '../../../../../Fields/Select';
import Checkbox from '../../../../../Fields/Checkbox';
import DatePicker from '../../../../../Fields/DatePicker/DatePicker';
import { getPropsField } from '../../../../../core/getProps';
import City from '../../../../../components/city/city';

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
      <div>
        <div class="row">
          <Input
            className="col-md-4"
            label={this.currentResources().firstName}
            {...getPropsField(userDetails, 'firstName')}
          />
          <Input
            className="col-md-4"
            label={this.currentResources().lastName}
            {...getPropsField(userDetails, 'lastName')}
          />
          <Input
            className="col-md-4"
            label={this.currentResources().age}
            {...getPropsField(userDetails, 'age')}
          />
          <Input
            className="col-md-4"
            label={this.currentResources().fatherAge}
            {...getPropsField(userDetails, 'fatherAge')}
          />

          <Textarea
            className="col-md-8"
            label={this.currentResources().comments}
            {...getPropsField(userDetails, 'comments')}
            rows={4}
            isAutoResize={false}
          />
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

          {/*
            <Grid item xs={6} sm={3}>
            <City {...getPropsField(userDetails, "city")} />
            </Grid> */}

          {/* <Checkbox
            className="col-md-4"
            label={this.currentResources().agreement}
            {...getPropsField(userDetails, "agreement")}
          /> */}
        </div>
        <span className="error-message">{this.props.message}</span>
      </div>
    );
  }
}
