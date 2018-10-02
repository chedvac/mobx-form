import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';

const styles = theme => {};

@withStyles(styles)
class ToolbarButton extends React.Component {
  constructor(props) {
    super(props);
    this.listItemClickEvent = this.listItemClickEvent.bind(this);
  }
  state = {
    isOpen: false
  };
  listItemClickEvent() {
    if (this.props.Popup) {
      this.setState({ isOpen: !this.state.isOpen });
    }
    if (this.props.buttonAction) {
      this.props.buttonAction();
    }
  }
  render() {
    const {
      classes,
      className,
      onMouseOverEvent,
      onMouseOutEvent,
      buttonText,
      visible,
      Popup
    } = this.props;

    return (
      <ListItem
        button
        onMouseOver={() => {
          onMouseOverEvent();
        }}
        onMouseOut={() => {
          onMouseOutEvent();
        }}
        visible={visible}
        onClick={this.listItemClickEvent}
      >
        <ListItemIcon>
          <Icon className={classes[className]} />
        </ListItemIcon>
        <ListItemText primary={buttonText} />
        {this.state.isOpen && <Popup isOpen={this.state.isOpen} />}
      </ListItem>
    );
  }
}

export default ToolbarButton;
