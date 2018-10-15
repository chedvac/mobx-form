import React from 'react';
import { observer } from 'mobx-react';
import SimpleFieldsTab from '../SimpleFieldsTab/SimpleFieldsTab';

@observer
class Tab3 extends React.Component {
  render() {
    return (
      <div>
        {this.props.tab3.listUsers.map(element => (
          <SimpleFieldsTab simpleFields={element} />
        ))}
      </div>
    );
  }
}
export default Tab3;
