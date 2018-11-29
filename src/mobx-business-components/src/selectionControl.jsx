import React from 'react';
import { enableUniqueIds } from 'react-html-id';
import { format } from 'utils/stringExtension';
import { autorun } from 'mobx';

function selectionControl(WrappedComponent) {
  return class SelectionControl extends React.Component {
    constructor(props) {
      super(props);
      enableUniqueIds(this);
      this.state = {
        value: props.value[props.name],
        message: props.validationState.message
      };
      this.handleChange = this.handleChange.bind(this);
    }

    reactionValue = autorun(() => {
      this.setState({ value: this.props.value[this.props.name] });
    });

    reactionMessage = autorun(() => {
      this.setState({ message: this.props.validationState.message });
    });

    getEventValue = e => {
      return e.target.value;
    };

    handleChange = e => {
      const newValue = this.getEventValue(e);
      this.setState({ value: newValue, message: '' });
    };

    render() {
      const message = format(this.state.message, this.props.label);
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value}
          message={message}
          id={this.lastUniqueId()}
          onChange={this.handleChange}
        />
      );
    }
  };
}
export default selectionControl;
