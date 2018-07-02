import React from "react";
import { observer } from "mobx-react";
import control from "./hocs/control";
import field from "./hocs/field";

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
