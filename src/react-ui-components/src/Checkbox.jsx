import React from 'react';
import { observer } from 'mobx-react';
import control from 'mobxReactForm/control';

@observer
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="checkbox" {...this.props} className="checkbox-field" />
      </div>
    );
  }
}
export default control(Checkbox);
