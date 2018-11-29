import React from 'react';
import { observer, inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Row from 'react-ui-components/structure/Row';
import SubTitle from 'react-ui-components/titles/SubTitle';

import { getPropsField } from 'mobx-react-form/getProps';

import Input from 'react-ui-components/fields/Input';
import Textarea from 'react-ui-components/fields/Textarea';
import Select from 'react-ui-components/fields/Select';
import DatePicker from 'react-ui-components/fields/DatePicker/DatePicker';
import RadioButtonsGroup from 'react-ui-components/fields/RadioButtonsGroup';

@inject('languageStore')
@observer
export default class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      firstName: this.props.languageStore.resourcesProvider({
        hebrew: ' שם פרטי',
        english: 'first name',
        arabic: ' שם פרטי'
      }),
      lastName: this.props.languageStore.resourcesProvider({
        hebrew: 'שם משפחה',
        english: 'last name',
        arabic: ''
      }),
      age: this.props.languageStore.resourcesProvider({
        hebrew: 'גיל הבן',
        english: 'age',
        arabic: ''
      }),
      fatherAge: this.props.languageStore.resourcesProvider({
        hebrew: 'גיל האב',
        english: 'father Age',
        arabic: ''
      }),
      comments: this.props.languageStore.resourcesProvider({
        hebrew: 'הערות',
        english: 'comments',
        arabic: ''
      }),
      gender: this.props.languageStore.resourcesProvider({
        hebrew: ' מין',
        english: 'Gender',
        arabic: 'Gender'
      }),
      female: this.props.languageStore.resourcesProvider({
        hebrew: ' נקבה',
        english: 'Female',
        arabic: 'Female'
      }),
      male: this.props.languageStore.resourcesProvider({
        hebrew: ' זכר',
        english: 'Male',
        arabic: 'Male'
      }),
      status: this.props.languageStore.resourcesProvider({
        hebrew: 'מצב משפחתי',
        english: 'status',
        arabic: ''
      }),
      agreement: this.props.languageStore.resourcesProvider({
        hebrew: 'אני מצהיר...',
        english: 'I Agree...',
        arabic: ''
      }),
      birthDate: this.props.languageStore.resourcesProvider({
        hebrew: 'תאריך לידה',
        english: 'birth date',
        arabic: ''
      })
    };
    this.statusOptions = [
      { key: '1', value: 'נשוי' },
      { key: '2', value: 'רווק' },
      { key: '3', value: 'גרוש' }
    ];
  }

  render() {
    const { userDetails } = this.props;
    const genderRadioButtonsDetails = [
      { value: '1', label: this.texts.female.get() },
      { value: '2', label: this.texts.male.get() }
    ];
    return (
      <div>
        <Grid container>
          <SubTitle>דוגמא לשדות רגילים</SubTitle>
          <Row>
            <Input
              label={this.texts.firstName.get()}
              {...getPropsField(userDetails, 'firstName')}
            />
            <Input
              label={this.texts.lastName.get()}
              {...getPropsField(userDetails, 'lastName')}
            />
            <Input
              label={this.texts.age.get()}
              {...getPropsField(userDetails, 'age')}
            />
            <Input
              label={this.texts.fatherAge.get()}
              {...getPropsField(userDetails, 'fatherAge')}
            />
          </Row>
          <Row>
            <Textarea
              xs={8}
              label={this.texts.comments.get()}
              {...getPropsField(userDetails, 'comments')}
              rows={3}
              isAutoResize={false}
            />
            <RadioButtonsGroup
              label={this.texts.gender.get()}
              radioButtonsDetails={genderRadioButtonsDetails}
              {...getPropsField(userDetails, 'gender')}
            />
          </Row>
          <br />
          <DatePicker
            className="col-md-4"
            label={this.texts.birthDate.get()}
            {...getPropsField(userDetails, 'birthDate')}
          />

          <Select
            className="col-md-4"
            label={this.texts.status.get()}
            {...getPropsField(userDetails, 'status')}
            options={this.statusOptions}
          />
        </Grid>
        <span className="error-message">
          {userDetails.validationState.messages}
        </span>
      </div>
    );
  }
}
