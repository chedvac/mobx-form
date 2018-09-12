import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    if (!this.props.isByFirstRedirect) {
      this.unblock = this.props.history.block(() => {
        return this.props.beforeLeave();
      });
    }
  }
  componentWillUnmount() {
    this.unblock();
  }
  componentDidMount() {
    this.props.onEnter ? this.props.onEnter() : true;
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}
Container.propTypes = {
  beforeLeave: PropTypes.func,
  onEnter: PropTypes.func
  //content: PropTypes.component.isRequired
};
export default Container;
