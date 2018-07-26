import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from '../../../Fields/Input';
import { getPropsField } from '../../../Fields/utils/getProps';

@inject('applicationData')
@observer
export default class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      hebrew: {
        email: ' מייל',
        houseNumber: ' מספר בית'
      },
      english: {
        email: 'first name',
        houseNumber: 'last name'
      },
      arabic: {
        email: 'first name',
        houseNumber: 'last name'
      }
    };
    this.currentResources = this.currentResources.bind(this);
  }
  currentResources = function() {
    return this.texts[this.props.applicationData.formLanguage.name];
  };
  render() {
    const { tables } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">
          <Input
            label={this.currentResources().email}
            {...getPropsField(tables, 'email')}
          />
        </div>
        <div className="col-md-4">
          <Input
            label={this.currentResources().houseNumber}
            {...getPropsField(tables, 'houseNumber')}
          />
        </div>
      </div>
    );
  }
}
