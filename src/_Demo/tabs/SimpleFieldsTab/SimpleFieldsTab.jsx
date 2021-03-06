import React from 'react';
import { observer } from 'mobx-react';
import PersonalInformation from './containers/PersonalInformation/PersonalInformation';
import Container from 'mobx-business-components/Container';
@observer
class SimpleFieldsTab extends React.Component {
  render() {
    return (
      <Container beforeLeave={this.props.simpleFields.validate} {...this.props}>
        <PersonalInformation
          userDetails={this.props.simpleFields.userDetails}
        />
        <PersonalInformation
          userDetails={this.props.simpleFields.userDetails}
        />
      </Container>
    );
  }
}
export default SimpleFieldsTab;
