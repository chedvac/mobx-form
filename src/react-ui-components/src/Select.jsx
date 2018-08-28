import React from 'react';
import { observer, inject } from 'mobx-react';
import control from 'mobx-react-form/control';
import field from './field';

@inject('applicationData')
@observer
class BaseSelect extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      english: {
        optionCaption: 'Choose'
      },
      hebrew: {
        optionCaption: 'בחר'
      },
      arabic: {
        optionCaption: 'اختر'
      }
    };
    !props.noOptionsCaption ? this.addOptionCaption() : null;
  }
  addOptionCaption = function() {
    const optionCaption =
      this.props.optionCaption || this.currentResources().optionCaption;
    this.props.options.unshift({ key: '', value: optionCaption });
  };
  currentResources = function() {
    return this.texts[this.props.applicationData.formLanguage.name];
  };

  render() {
    const { options = [] } = this.props || {};
    return (
      <div>
        <select className="select-field" {...this.props}>
          {options.map(option => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
export default control(BaseSelect);
