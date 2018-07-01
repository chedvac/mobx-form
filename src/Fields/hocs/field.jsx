import React from "react";
import { Label } from "../utils/Label";
import { ErrorMessage } from "../utils/ErrorMessage";

function field(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div {...this.props}>
          <Label {...this.props} />
          <Component {...this.props} />
          <ErrorMessage message={this.props.message} />
        </div>
      );
    }
  };
}
export default field;
