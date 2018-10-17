import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'react-ui-components/fields/Input';
import { getPropsField } from 'mobx-react-form/getProps';

@inject('applicationData')
@observer
export default class Tab3 extends React.Component {
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
        <div className="col-md-4">טאב 3</div>
      </div>
    );
  }
}
