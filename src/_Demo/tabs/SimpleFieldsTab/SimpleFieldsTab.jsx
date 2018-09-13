import React from 'react';
import { observer } from 'mobx-react';
import PersonalInformation from './containers/PersonalInformation/PersonalInformation';
import Container from 'mobxReactForm/Containers/container';
@observer
class SimpleFieldsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container beforeLeave={this.props.simpleFields.validate}>
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
