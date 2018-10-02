import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'react-ui-components/fields/Input';
import { getPropsField } from 'mobx-react-form/getProps';

@inject('applicationData')
@observer
export default class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      email: { hebrew: 'מייל', english: 'email', arabic: '' },
      houseNumber: { hebrew: 'מספר בית', english: 'House Number', arabic: '' }
    };
  }
  render() {
    const { tables, applicationData } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">
          <Input
            texts={this.texts.email}
            {...getPropsField(tables, 'email', applicationData)}
          />
        </div>
        <div className="col-md-4">
          <Input
            texts={this.texts.houseNumber}
            {...getPropsField(tables, 'houseNumber', applicationData)}
          />
        </div>
      </div>
    );
  }
}
