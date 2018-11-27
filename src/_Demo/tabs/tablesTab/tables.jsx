import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'react-ui-components/fields/Input';
import { getPropsField } from 'mobx-react-form/getProps';
import Container from 'mobx-business-components/container';
import RepeatedFields from 'govil-common-content/forms-ui-components/src/repeatedFields/repeatedFields';
import PersonalInformation from '_Demo/tabs/SimpleFieldsTab/containers/PersonalInformation/PersonalInformation';

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
        <RepeatedFields
          array={tables.users}
          // propName="userDetails"
          rowTitle="ttttt"
          renderComponent={item => <PersonalInformation userDetails={item} />}
        />
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
