import React from 'react';
import { enableUniqueIds } from 'react-html-id';
import { format } from 'utils/stringExtension';
import { autorun } from 'mobx';
function control(WrappedComponent) {
  return class Control extends React.Component {
    constructor(props) {
      super(props);
      enableUniqueIds(this);
      this.state = {
        value: props.value[props.name],
        message: props.validationState.message
      };
      this.handleBlur = this.handleBlur.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    reactionValue = autorun(() => {
      this.setState({ value: this.props.value[this.props.name] });
    });

    reactionMessage = autorun(() => {
      this.setState({ message: this.props.validationState.message });
    });

    getEventValue = e => {
      const value =
        e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      return value;
    };

    handleBlur = e => {
      const newValue = this.getEventValue(e);
      this.props.update(newValue);
      this.setState({ message: this.props.validationState.message });
    };

    handleChange = e => {
      const newValue = this.getEventValue(e);
      const validatePattern = this.props.validateCharsPattern(newValue);
      if (validatePattern.isValid) {
        this.setState({ value: newValue, message: '' });
      } else {
        this.setState({ message: validatePattern.message });
      }
    };

    render() {
      const message =
        this.props.message || format(this.state.message, this.props.label);
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value}
          message={message}
          id={this.lastUniqueId()}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      );
    }
  };
}
export default control;
