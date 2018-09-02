import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.history.location.pathname ===
      this.props.history.location.pathname
    ) {
      return true;
    }
    const sholdUpdate = this.props.beforeLeave
      ? this.props.beforeLeave()
      : true;
    if (sholdUpdate) {
      return true;
    }
    this.props.history.block(() => {
      return false;
    });
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}
Container.propTypes = {
  onLeave: PropTypes.func,
  onEnter: PropTypes.func
  //content: PropTypes.component.isRequired
};
export default Container;
