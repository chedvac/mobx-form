import React from 'react';
import PropTypes from 'prop-types';
export default function ContainerWrapper(WrappedComponent) {
  class Container extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillUnmount() {
      return this.props.beforeNavigate ? this.props.beforeNavigate() : true;
    }
    render() {
      return (
        <div className={'container'}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  Container.propTypes = {
    beforeNavigate: PropTypes.func
    //content: PropTypes.component.isRequired
  };
  return Container;
}
