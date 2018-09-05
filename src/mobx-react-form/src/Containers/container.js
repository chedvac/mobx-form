import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unblock = this.props.history.block(() => {
      return this.props.beforeLeave();
    });
  }
  componentWillUnmount() {
    this.unblock();
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
