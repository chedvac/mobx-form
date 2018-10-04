import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

@observer
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    if (!this.props.isFirstRedirect) {
      this.unblock = this.props.history.block(() => {
        return this.props.beforeLeave();
      });
    }
  }
  componentWillUnmount() {
    if (this.unblock) {
      this.unblock();
    }
  }
  componentDidMount() {
    if (this.props.onEnter) {
      this.props.onEnter();
    }
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
export default withRouter(Container);
