import React from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import control from 'mobx-react-form/control';
import field from '../field';

import { default as DayPickerInput } from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from './utils';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ar';
import 'moment/locale/he';
import languageResources from '../../../resources/languages';
import './DatePicker.css';

@inject('applicationData')
@observer
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.currentResources = this.currentResources.bind(this);

    const defaultSettings = {
      format: 'L',
      placeholder: 'dd/mm/yyyy',
      formatDate: formatDate,
      parseDate: parseDate
    };
    this.settings = { ...defaultSettings, ...props.settings };
  }

  currentResources = () => {
    return languageResources[this.props.applicationData.formLanguage.name];
  };

  render() {
    const className = `direction-${this.currentResources().dir}`;
    return (
      <DayPickerInput
        {...this.settings}
        value={this.props.value}
        inputProps={{ ...this.props }}
        dayPickerProps={{
          localeUtils: MomentLocaleUtils,
          locale: this.currentResources().shortName,
          className: className,
          dir: this.currentResources().dir
        }}
      />
    );
  }
}
export default field(control(DatePicker));
