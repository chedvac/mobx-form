import React from 'react';
import { enableUniqueIds } from 'react-html-id';

function control(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      enableUniqueIds(this);
      this.state = {
        value: props.field
      };
      this.updateStore = this.updateStore.bind(this);
      this.updateState = this.updateState.bind(this);
    }

    getEventValue = e => {
      return e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    };

    updateStore = e => {
      const newValue = this.getEventValue(e);
      this.props.update(newValue);
    };

    updateState = e => {
      this.setState({ value: this.getEventValue(e) });
    };

    shouldComponentUpdate(nextProps, nextState) {
      if (
        this.props.field !== nextProps.field &&
        this.state.value !== nextProps.field
      ) {
        //
        this.setState({ value: nextProps.field });
        return true;
      }
      return true;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          id={this.lastUniqueId()}
          onChange={this.updateState}
          onBlur={this.updateStore}
        />
      );
    }
  };
}
export default control;
