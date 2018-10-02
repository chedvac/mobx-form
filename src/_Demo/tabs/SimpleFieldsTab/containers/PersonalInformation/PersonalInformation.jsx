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
      firstName: {
        hebrew: ' שם פרטי',
        english: 'first name',
        arabic: ' שם פרטי'
      },
      lastName: { hebrew: 'שם משפחה', english: 'last name', arabic: '' },
      age: { hebrew: 'גיל הבן', english: 'age', arabic: '' },
      fatherAge: { hebrew: 'גיל האב', english: 'father Age', arabic: '' },
      comments: { hebrew: 'הערות', english: 'comments', arabic: '' },
      status: { hebrew: 'מצב משפחתי', english: 'status', arabic: '' },
      agreement: {
        hebrew: 'אני מצהיר...',
        english: 'I Agree...',
        arabic: ''
      },
      birthDate: { hebrew: 'תאריך לידה', english: 'birth date', arabic: '' }
    };
    this.statusOptions = [
      { key: '1', value: 'נשוי' },
      { key: '2', value: 'רווק' },
      { key: '3', value: 'גרוש' }
    ];
  }

  render() {
    const { userDetails, applicationData } = this.props;

    return (
      <div>
        <Grid container>
          <SubTitle>דוגמא לשדות רגילים</SubTitle>
          <Row>
            <Input
              texts={this.texts.firstName}
              {...getPropsField(userDetails, 'firstName', applicationData)}
            />
            <Input
              texts={this.texts.lastName}
              {...getPropsField(userDetails, 'lastName', applicationData)}
            />
            <Input
              texts={this.texts.age}
              {...getPropsField(userDetails, 'age', applicationData)}
            />
            <Input
              texts={this.texts.fatherAge}
              {...getPropsField(userDetails, 'fatherAge', applicationData)}
            />
          </Row>
          <Row>
            <WhiteButton>לשלב הקודם</WhiteButton>
            <BlueButton>לשלב הבא</BlueButton>
          </Row>
          <Row>
            <Textarea
              xs={8}
              texts={this.texts.comments}
              {...getPropsField(userDetails, 'comments', applicationData)}
              rows={3}
              isAutoResize={false}
            />
          </Row>
          <br />
          <DatePicker
            className="col-md-4"
            texts={this.texts.birthDate}
            {...getPropsField(userDetails, 'birthDate', applicationData)}
          />

          <Select
            className="col-md-4"
            texts={this.texts.status}
            {...getPropsField(userDetails, 'status', applicationData)}
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
