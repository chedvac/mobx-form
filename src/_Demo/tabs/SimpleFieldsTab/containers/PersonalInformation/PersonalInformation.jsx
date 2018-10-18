import React from 'react';
import { observer, inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Row from 'react-ui-components/structure/row';
import SubTitle from 'react-ui-components/titles/subTitle';

import { getPropsField } from 'mobx-react-form/getProps';

import Input from 'react-ui-components/fields/Input';
import Textarea from 'react-ui-components/fields/Textarea';
import Select from 'react-ui-components/fields/Select';
import DatePicker from 'react-ui-components/fields/DatePicker/DatePicker';

// const styles = theme => ({
//   root: { flexGrow: 1 }
// });

@inject('languageStore')
@observer
export default class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      firstName: this.props.languageStore.computedResourcesProvider({
        hebrew: ' שם פרטי',
        english: 'first name',
        arabic: ' שם פרטי'
      }),
      lastName: this.props.languageStore.computedResourcesProvider({
        hebrew: 'שם משפחה',
        english: 'last name',
        arabic: ''
      }),
      age: this.props.languageStore.computedResourcesProvider({
        hebrew: 'גיל הבן',
        english: 'age',
        arabic: ''
      }),
      fatherAge: this.props.languageStore.computedResourcesProvider({
        hebrew: 'גיל האב',
        english: 'father Age',
        arabic: ''
      }),
      comments: this.props.languageStore.computedResourcesProvider({
        hebrew: 'הערות',
        english: 'comments',
        arabic: ''
      }),
      status: this.props.languageStore.computedResourcesProvider({
        hebrew: 'מצב משפחתי',
        english: 'status',
        arabic: ''
      }),
      agreement: this.props.languageStore.computedResourcesProvider({
        hebrew: 'אני מצהיר...',
        english: 'I Agree...',
        arabic: ''
      }),
      birthDate: this.props.languageStore.computedResourcesProvider({
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
