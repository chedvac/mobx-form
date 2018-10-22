import React from 'react';
import { observer, inject } from 'mobx-react';
import control from 'mobx-business-components/control';

@inject('applicationData')
@inject('languageStore')
@observer
class BaseSelect extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      optionCaption: this.props.languageStore.computedResourcesProvider({
        english: 'Choose',
        hebrew: 'בחר',
        arabic: 'اختر'
      })
    };
    !props.noOptionsCaption ? this.addOptionCaption() : null;
  }
  addOptionCaption = function() {
    const optionCaption =
      this.props.optionCaption || this.texts.optionCaption.get();
    this.props.options.unshift({ key: '', value: optionCaption });
  };

  render() {
    const { options = [], label } = this.props || {};
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
