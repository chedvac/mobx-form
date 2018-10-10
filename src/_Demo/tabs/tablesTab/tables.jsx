import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'reactUiComponents/fields/Input';
import { getPropsField } from 'mobxReactForm/getProps';
import Container from 'mobxReactForm/Containers/container';

@inject('applicationData')
@inject('languageStore')
@observer
export default class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.texts = {
      email: this.props.languageStore.computedResourcesProvider({
        hebrew: 'מייל',
        english: 'email',
        arabic: ''
      }),
      houseNumber: this.props.languageStore.computedResourcesProvider({
        hebrew: 'מספר בית',
        english: 'House Number',
        arabic: ''
      })
    };
  }
  render() {
    const { tables } = this.props;
    return (
      <Container beforeLeave={this.props.tables.validate} {...this.props}>
        <div className="row">
          <div className="col-md-4">
            <Input
              label={this.texts.email.get()}
              {...getPropsField(tables, 'email')}
            />
          </div>
          <div className="col-md-4">
            <Input
              label={this.texts.houseNumber.get()}
              {...getPropsField(tables, 'houseNumber')}
            />
          </div>
        </div>
      </Container>
    );
  }
}
