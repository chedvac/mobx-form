import React from 'react';
import { observer, inject } from 'mobx-react';
import control from 'mobxReactForm/control';

import { default as DayPickerInput } from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from './utils';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ar';
import 'moment/locale/he';
import './DatePicker.css';

@inject('applicationData')
@inject('languageStore')
@observer
class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    const defaultSettings = {
      format: 'L',
      placeholder: 'dd/mm/yyyy',
      formatDate: formatDate,
      parseDate: parseDate
    };
    this.settings = { ...defaultSettings, ...props.settings };
  }

  render() {
    const className = `direction-${this.props.languageStore.direction}`;
    return (
      <DayPickerInput
        {...this.settings}
        value={this.props.value}
        inputProps={{ ...this.props }}
        dayPickerProps={{
          localeUtils: MomentLocaleUtils,
          locale: this.props.languageStore.getShortName,
          className: className,
          dir: this.props.languageStore.direction
        }}
      />
    );
  }
}
export default control(DatePicker);
