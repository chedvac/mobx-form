import React from 'react';
import { observer } from 'mobx-react';
import PersonalInformation from './containers/PersonalInformation/PersonalInformation';

@observer
class SimpleFieldsTab extends React.Component {
  render() {
    return (
      <div>
        <PersonalInformation
          userDetails={this.props.simpleFields.userDetails}
        />
        <PersonalInformation
          userDetails={this.props.simpleFields.userDetails}
        />
        {this.props.simpleFields.users.map(element => (
          <PersonalInformation userDetails={element} />
        ))}
      </div>
    );
  }
}
export default SimpleFieldsTab;
