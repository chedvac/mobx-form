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
class PersonalInformation extends React.Component {
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
        <div className="row">
          <div className="col-md-4">
            <Input
              label={this.currentResources().firstName}
              {...getPropsField(userDetails, 'firstName')}
            />
          </div>
          <div className="col-md-4">
            <Input
              label={this.currentResources().lastName}
              {...getPropsField(userDetails, 'lastName')}
            />
          </div>
          <div className="col-md-4">
            <Input
              label={this.currentResources().age}
              {...getPropsField(userDetails, 'age')}
            />
          </div>
          <div className="col-md-4">
            <Input
              label={this.currentResources().fatherAge}
              {...getPropsField(userDetails, 'fatherAge')}
            />
          </div>
          <div className="col-md-4">
            <Input
              label="שם האב"
              {...getPropsField(userDetails, 'fatherName')}
            />
          </div>
          <div className="col-md-4">
            <Textarea
              label={this.currentResources().comments}
              {...getPropsField(userDetails, 'comments')}
              rows={4}
              isAutoResize={false}
            />
          </div>
          <div className="col-md-4">
            <DatePicker
              label={this.currentResources().birthDate}
              {...getPropsField(userDetails, 'birthDate')}
            />
          </div>
          <div className="col-md-4">
            <Select
              label={this.currentResources().status}
              {...getPropsField(userDetails, 'status')}
              options={this.statusOptions}
            />
          </div>

          <div className="col-md-4">
            <City {...getPropsField(userDetails, 'city')} />
          </div>
        </div>
        <span className="error-message">{this.props.message}</span>
        {/* <div className="row">
                    <div className="col-md-4">
                        <Agreement label={this.currentResources().agreement} />
                    </div>
                </div> */}
      </div>
    );
  }
}
export default PersonalInformation;
