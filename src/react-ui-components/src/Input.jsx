import React from 'react';
import { observer } from 'mobx-react';
import control from 'mobx-react-form/control';
import field from './field';

@observer
class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input {...this.props} />;
  }
}
export default field(control(Input));
