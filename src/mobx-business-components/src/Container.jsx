import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

@observer
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.page.exit(this.props.path, (ctx, next) => {
      if (this.props.beforeLeave) {
        this.runBeforeLeave(next, ctx);
      }
    });
  }
  runBeforeLeave(next, ctx) {
    this.props.beforeLeave().then(res => {
      if (res) {
        next();
      } else {
        ctx.pushState(ctx.prevContext);
        ctx.page.replace(ctx.path);
      }
    });
  }
  componentWillUnmount() {
    if (this.props.onLeave) {
      this.props.onLeave();
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
  onEnter: PropTypes.func,
  onLeave: PropTypes.func
  //content: PropTypes.component.isRequired
};
export default Container;
