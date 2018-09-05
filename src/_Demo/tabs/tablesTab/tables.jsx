import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'reactUiComponents/Input';
import { getPropsField } from 'mobxReactForm/utils/getProps';
import Container from 'mobxReactForm/Containers/container';

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
      <Container
        beforeLeave={this.props.tables.validate}
        history={this.props.history}
        location={this.props.location}
      >
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
      </Container>
    );
  }
}
