import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class Language extends React.Component {
  constructor(props) {
    super(props);

    this.texts = {
      hebrew: {
        selectLanguage: 'בחירת שפה'
      },
      english: {
        selectLanguage: 'select Language'
      },
      arabic: {
        selectLanguage: 'בחירת שפה'
      }
    };
    this.currentResources = this.currentResources.bind(this);
  }
  currentResources = function() {
    return this.texts[this.props.applicationData.formLanguage.model.name];
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <label>
            <span>{this.currentResources().selectLanguage}</span>
          </label>
          <input
            type="radio"
            onChange={e =>
              this.props.applicationData.formLanguage.setName('hebrew')
            }
            className="text-field"
            value={'hebrew'}
            name="language"
          />
          <label className="label-radio-combined">
            <span>עברית</span>
          </label>
          <input
            type="radio"
            onChange={e =>
              this.props.applicationData.formLanguage.setName('english')
            }
            className="text-field"
            value="english"
            name="language"
          />
          <label className="label-radio-combined">
            <span>אנגלית</span>
          </label>
        </div>
      </div>
    );
  }
}
