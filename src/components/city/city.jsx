import React from 'react';
import { observer } from 'mobx-react';
import Select from '../../Fields/Select';
import cityList from '../../govServices/dataServices/cityProvider';

@observer
export default class City extends React.Component {
  constructor(props) {
    super(props);

    this.texts = {
      hebrew: {
        selectLanguage: 'בחר'
      },
      english: {
        selectLanguage: 'בחר'
      },
      arabic: {
        selectLanguage: 'בחר'
      }
    };
    this.cityList = cityList;
    this.currentResources = this.currentResources.bind(this);
  }

  currentResources = function() {
    return this.texts['hebrew'];
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <Select
            options={this.cityList}
            {...this.props}
            label={this.currentResources().selectLanguage}
          />
        </div>
      </div>
    );
  }
}
