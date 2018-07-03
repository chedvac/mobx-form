import React from "react";
import { observer } from "mobx-react";
import control from "./hocs/control";
import { Label } from "./utils/Label";
import { ErrorMessage } from "./utils/ErrorMessage";

@observer
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="checkbox" {...this.props} className="checkbox-field" />
        <Label {...this.props} />
        <ErrorMessage message={this.props.message} />
      </div>
    );
  }
}
export default control(Checkbox);
